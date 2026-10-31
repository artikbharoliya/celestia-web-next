import { test, expect } from "@playwright/test";

// Browser checks never contact Google verification, Microsoft, or the live API.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.grecaptcha = {
      ready: (callback) => callback(),
      execute: async () => "browser-test-token",
    };
  });
  await page.route("**/recaptcha/**", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.route("**/*googletagmanager.com/**", (route) => route.abort());
  await page.route("**/*google-analytics.com/**", (route) => route.abort());
  await page.route("**/api/contact", (route) => route.abort());
});

const pages = [
  "/",
  "/products",
  "/products/arlies",
  "/products/lynx",
  "/products/orion",
  "/products/nexis",
  "/projects",
  "/contact",
];
for (const path of pages) {
  test(`page layout and assets: ${path}`, async ({ page }, testInfo) => {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator("main h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    if (path === "/projects")
      await expect(page.locator("main figure")).toHaveCount(18);
    if (path === "/" || path === "/products") {
      for (const product of ["Arlies", "Lynx", "Orion", "Nexis"])
        await expect(
          page.getByRole("heading", { name: product, exact: true }),
        ).toBeVisible();
    }
    // Load lower-page images before capturing full-page review screenshots.
    await page.locator("main img").evaluateAll(async (images) => {
      images.forEach((image) => {
        image.loading = "eager";
      });
      await Promise.all(images.map((image) => image.decode().catch(() => {})));
    });
    expect(
      await page
        .locator("main img")
        .evaluateAll((images) =>
          images.every((image) => image.naturalWidth > 0),
        ),
    ).toBe(true);
    await page.evaluate(() => document.fonts.ready);
    if (["/", "/products/arlies", "/projects", "/contact"].includes(path)) {
      const name = path === "/" ? "home" : path.replaceAll("/", "-").slice(1);
      await page.addStyleTag({ content: "nextjs-portal { display: none; }" });
      if (path === "/")
        await page.screenshot({
          path: testInfo.outputPath("home-viewport.png"),
          animations: "disabled",
        });
      await page.screenshot({
        path: testInfo.outputPath(`${name}.png`),
        fullPage: true,
        animations: "disabled",
      });
    }
  });
}

test("project gallery reveals captions without moving the grid", async ({
  page,
}, testInfo) => {
  await page.goto("/projects");
  const projects = page.locator("main figure");
  const first = projects.first();
  const description = first.locator("figcaption p");
  const photo = first.getByRole("img");
  await first.scrollIntoViewIfNeeded();
  await photo.evaluate((image) => image.decode());
  await page.evaluate(() => document.fonts.ready);
  const nextPosition = await projects.nth(3).boundingBox();
  const hasHover = await page.evaluate(
    () => matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  if (hasHover) {
    await expect(description).toHaveCSS("opacity", "0");
    await photo.hover();
    await expect(description).toHaveCSS("opacity", "1");
    await expect(photo).toHaveCSS(
      "transform",
      "matrix(1.04, 0, 0, 1.04, 0, 0)",
    );
    const afterHover = await projects.nth(3).boundingBox();
    expect(afterHover.y).toBeCloseTo(nextPosition.y, 1);
    await page.mouse.move(0, 0);
    await expect(description).toHaveCSS("opacity", "0");
    await first.focus();
    await expect(description).toHaveCSS("opacity", "1");
    await page.keyboard.press("Tab");
    await expect(projects.nth(1)).toBeFocused();
    await expect(projects.nth(1).locator("figcaption p")).toHaveCSS(
      "opacity",
      "1",
    );
    await first.focus();
  } else {
    // Touch visitors can read the copy without needing a hover gesture.
    await expect(description).toHaveCSS("opacity", "1");
    await expect(photo).toHaveCSS("transform", "none");
  }

  await page.addStyleTag({ content: "nextjs-portal { display: none; }" });
  await page.screenshot({
    path: testInfo.outputPath("gallery-interaction.png"),
    animations: "disabled",
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(photo).toHaveCSS("transform", "none");
  await expect(description).toHaveCSS("opacity", "1");
});

test("navigation works with keyboard and on small screens", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const mobile = page.viewportSize().width < 992;
  if (mobile)
    await navigation
      .getByRole("button", { name: "Toggle navigation", exact: true })
      .click();
  const toggle = navigation.getByRole("button", {
    name: "Toggle product links",
  });
  await toggle.click();
  await expect(
    navigation.getByRole("link", { name: "Arlies", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await navigation.getByRole("link", { name: "Arlies", exact: true }).click();
  await expect(page).toHaveURL(/products\/arlies$/);
  if (mobile)
    await navigation
      .getByRole("button", { name: "Toggle navigation", exact: true })
      .click();
  await navigation.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator("#about")).toBeInViewport();
});

test("carousel advances, pauses, and supports manual controls", async ({
  page,
}) => {
  await page.goto("/");
  const carousel = page.getByRole("region", {
    name: "Architectural applications",
    exact: true,
  });
  await page.mouse.move(1, 1);
  await expect(carousel.getByText("01 / 03", { exact: true })).toBeVisible();
  // Use the real browser clock here so CSS fades and Bootstrap timers stay in sync.
  await expect(carousel.getByText("02 / 03", { exact: true })).toBeVisible({
    timeout: 10000,
  });
  await carousel.getByRole("button", { name: "Pause slideshow" }).click();
  await page.mouse.move(1, 1);
  await page.getByRole("link", { name: "Explore systems" }).focus();
  // Wait longer than one autoplay interval to verify the explicit pause persists.
  await page.waitForTimeout(7500);
  await expect(carousel.getByText("02 / 03", { exact: true })).toBeVisible();
  await carousel.getByRole("button", { name: "Next image" }).click();
  await expect(carousel.getByText("03 / 03", { exact: true })).toBeVisible();
  await expect(
    carousel.locator('.carousel-item[aria-label="Image 3 of 3"]'),
  ).toHaveClass(/^(active carousel-item|carousel-item active)$/);
  await carousel.getByRole("button", { name: "Previous image" }).click();
  await expect(carousel.getByText("02 / 03", { exact: true })).toBeVisible();
});

test("reduced motion disables autoplay but keeps manual navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.clock.install();
  await page.goto("/");
  const carousel = page.getByRole("region", {
    name: "Architectural applications",
    exact: true,
  });
  await expect(
    carousel.getByRole("button", {
      name: "Autoplay disabled for reduced motion",
    }),
  ).toBeDisabled();
  await page.clock.fastForward(22000);
  await expect(carousel.getByText("01 / 03", { exact: true })).toBeVisible();
  await carousel.getByRole("button", { name: "Next image" }).click();
  await expect(carousel.getByText("02 / 03", { exact: true })).toBeVisible();
});

for (const path of ["/", "/contact"]) {
  for (const success of [true, false]) {
    test(`inquiry ${success ? "success" : "failure"} on ${path}`, async ({
      page,
    }) => {
      let submitted;
      let release;
      const pending = new Promise((resolve) => {
        release = resolve;
      });
      await page.route("**/api/contact", async (route) => {
        submitted = route.request().postDataJSON();
        await pending;
        await route.fulfill({
          status: success ? 200 : 503,
          contentType: "application/json",
          body: JSON.stringify({
            message: success
              ? "Your inquiry has been received. Thank you!"
              : "Unable to save your inquiry right now. Please try again later.",
          }),
        });
      });
      await page.goto(path);
      const form = page.getByRole("form", { name: "Project inquiry" });
      await form.getByLabel("Name", { exact: true }).fill("Alex Customer");
      await form.getByLabel("Email", { exact: true }).fill("alex@example.com");
      await form.getByLabel("Occupation").selectOption("Architects");
      await form.getByLabel("Employer / Company").fill("Example Studio");
      await form
        .getByLabel("Message", { exact: true })
        .fill("Please tell me about your ceiling systems.");
      await form.getByRole("button", { name: "Send inquiry" }).click();
      await expect(
        form.getByRole("button", { name: "Sending…" }),
      ).toBeDisabled();
      release();
      await expect(
        page.getByText(
          success
            ? "Your inquiry has been received. Thank you!"
            : "Unable to save your inquiry right now. Please try again later.",
          { exact: true },
        ),
      ).toBeVisible();
      expect(submitted).toEqual({
        name: "Alex Customer",
        email: "alex@example.com",
        occupation: "Architects",
        company: "Example Studio",
        message: "Please tell me about your ceiling systems.",
        website: "",
        captchaToken: "browser-test-token",
      });
      await expect(form.getByLabel("Name", { exact: true })).toHaveValue(
        success ? "" : "Alex Customer",
      );
    });
  }
}

test("product document links and drawings dialog work", async ({
  page,
  request,
}) => {
  for (const name of ["arlies", "lynx", "orion", "nexis"]) {
    await page.goto(`/products/${name}`);
    await page.getByRole("button", { name: "View dimension drawings" }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const hrefs = await page
      .locator("a[download]")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(hrefs.length).toBeGreaterThan(2);
    for (const href of hrefs)
      expect((await request.get(href)).status(), href).toBe(200);
    await dialog.getByRole("button", { name: "Close", exact: true }).click();
    await expect(dialog).not.toBeVisible();
  }
});
