import { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import Button from "@/components/Button";
import styles from "./ContactForm.module.scss";

const RECAPTCHA_ACTION = "contact_form_submit";
const RECAPTCHA_CHECK_INTERVAL_MS = 150;
const RECAPTCHA_CHECK_TIMEOUT_MS = 8000;
const OCCUPATION_OPTIONS = [
  "Architects",
  "Sales representative",
  "Civil Engineers",
  "Construction contractors",
  "Other",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    occupation: "",
    company: "",
    message: "",
    website: "",
  });
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      setIsRecaptchaReady(false);
      return;
    }

    let isCancelled = false;
    let intervalId = null;
    let timeoutId = null;

    const stopPolling = () => {
      if (intervalId) {
        window.clearInterval(intervalId);
        intervalId = null;
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const markReady = () => {
      if (isCancelled) {
        return;
      }

      setIsRecaptchaReady(true);
      stopPolling();
    };

    const checkRecaptchaReady = () => {
      if (typeof window === "undefined") {
        return;
      }

      if (!window.grecaptcha || typeof window.grecaptcha.ready !== "function") {
        return;
      }

      window.grecaptcha.ready(markReady);
    };

    setIsRecaptchaReady(false);
    checkRecaptchaReady();
    intervalId = window.setInterval(
      checkRecaptchaReady,
      RECAPTCHA_CHECK_INTERVAL_MS,
    );
    timeoutId = window.setTimeout(stopPolling, RECAPTCHA_CHECK_TIMEOUT_MS);

    return () => {
      isCancelled = true;
      stopPolling();
    };
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getRecaptchaToken = async () => {
    if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
      throw new Error("reCAPTCHA is not ready. Please try again.");
    }

    await new Promise((resolve) => window.grecaptcha.ready(resolve));
    return window.grecaptcha.execute(siteKey, { action: RECAPTCHA_ACTION });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!siteKey) {
      setSubmitStatus("error");
      setSubmitMessage("Form is not configured yet. Please try again later.");
      return;
    }

    if (!isRecaptchaReady) {
      setSubmitStatus("error");
      setSubmitMessage(
        "Verification is still loading. Please try again in a moment.",
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const captchaToken = await getRecaptchaToken();
      if (!captchaToken) {
        throw new Error("Unable to verify your request. Please try again.");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          occupation: formData.occupation,
          company: formData.company,
          message: formData.message,
          website: formData.website,
          captchaToken,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          payload.message || "Unable to send your message right now.",
        );
      }

      setSubmitStatus("success");
      setSubmitMessage(
        payload.message || "Your inquiry has been received. Thank you!",
      );
      setFormData({
        name: "",
        email: "",
        occupation: "",
        company: "",
        message: "",
        website: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        error.message || "Unable to send your message right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      {submitStatus !== "idle" && (
        <Alert
          variant={submitStatus === "success" ? "success" : "danger"}
          role={submitStatus === "success" ? "status" : "alert"}
        >
          {submitMessage}
        </Alert>
      )}
      <Form
        onSubmit={handleSubmit}
        className={styles.form}
        aria-label="Project inquiry"
      >
        {/* The two-column field grid collapses to one column on small screens. */}
        <div className={styles.fields}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={254}
              required
            />
          </Form.Group>
          <Form.Group controlId="formOccupation">
            <Form.Label>Occupation</Form.Label>
            <Form.Select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">Select occupation</option>
              {OCCUPATION_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formCompany">
            <Form.Label>Employer / Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              maxLength={150}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMessage" className={styles.messageField}>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              maxLength={2000}
              required
            />
          </Form.Group>
        </div>
        {/* Keep the existing honeypot and submission payload unchanged. */}
        <Form.Group
          controlId="formWebsite"
          className="d-none"
          aria-hidden="true"
        >
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </Form.Group>
        {!siteKey && (
          <Alert variant="warning" className="mt-3 mb-0">
            The form is temporarily unavailable. Please contact our team
            directly.
          </Alert>
        )}
        {siteKey && !isRecaptchaReady && (
          <p className={styles.verification} role="status">
            Verification is loading. Please wait a moment before submitting.
          </p>
        )}
        <div className={styles.submitRow}>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting || !siteKey || !isRecaptchaReady}
          >
            {isSubmitting ? "Sending…" : "Send inquiry"}{" "}
            <span aria-hidden="true">↗</span>
          </Button>
          <span className={styles.requiredNote}>All fields are required.</span>
        </div>
        <Form.Text className={styles.privacy}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </Form.Text>
      </Form>
    </div>
  );
}
