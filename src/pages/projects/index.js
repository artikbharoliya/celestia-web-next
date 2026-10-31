import { breadcrumbSchema } from "@/common/seo";
import Layout from "@/components/Layout";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import TitleSection from "@/components/TitleSection";

export default function ProjectPage() {
  // Keep each caption with its photograph; describe visible details without guessing project credits.
  const photos = [
    {
      src: "/assets/projects/1.jpg",
      alt: "Wood-look ceiling above a glass-lined corridor",
      description:
        "Wood-look linear panels and recessed downlights define a long, glazed corridor.",
    },
    {
      src: "/assets/projects/2.jpg",
      alt: "Silver-toned ceiling beside frosted lounge windows",
      description:
        "A silver-toned linear ceiling complements frosted glazing in a bright lounge.",
    },
    {
      src: "/assets/projects/3.jpg",
      alt: "Tall exterior screen of closely spaced vertical fins",
      description:
        "Closely spaced vertical fins create a tall, rhythmic screen against the facade.",
    },
    {
      src: "/assets/projects/4.jpg",
      alt: "Tower with recessed balconies and horizontal facade bands",
      description:
        "Recessed balconies and horizontal bands give this tower a strong, ordered facade.",
    },
    {
      src: "/assets/projects/5.jpg",
      alt: "Dark parallel ceiling baffles viewed from below",
      description:
        "Dark parallel baffles create depth and a clear directional rhythm overhead.",
    },
    {
      src: "/assets/projects/6.jpg",
      alt: "Table-tennis room beneath dark ceiling fins and linear lights",
      description:
        "Slim lighting runs between dark ceiling fins above a table-tennis room.",
    },
    {
      src: "/assets/projects/7.jpg",
      alt: "Linear ceiling and inset lighting above a conference table",
      description:
        "A continuous linear ceiling and inset lighting frame a long conference table.",
    },
    {
      src: "/assets/projects/8.jpg",
      alt: "Warm wood-look ceiling panels in a bright corridor",
      description:
        "Warm wood-look panels carry a consistent ceiling finish through a bright corridor.",
    },
    {
      src: "/assets/projects/9.jpg",
      alt: "Wood-toned slatted canopy with integrated linear lighting",
      description:
        "Wood-toned slats and slim linear lighting define a sheltered entrance canopy.",
    },
    {
      src: "/assets/projects/10.jpg",
      alt: "Dark ceiling with recessed lights above a stone-lined lift lobby",
      description:
        "A dark linear ceiling and recessed lights contrast with the stone-lined lift lobby.",
    },
    {
      src: "/assets/projects/11.jpg",
      alt: "Pale linear ceiling with cylindrical downlights and a light strip",
      description:
        "Cylindrical downlights punctuate a pale linear ceiling beside a continuous light strip.",
    },
    {
      src: "/assets/projects/12.jpg",
      alt: "Parallel ceiling panels with rows of spotlights",
      description:
        "Parallel ceiling panels provide a clean backdrop for spotlights and integrated lighting.",
    },
    {
      src: "/assets/projects/13.jpg",
      alt: "Central louvered facade screen between rows of balconies",
      description:
        "A central louvered screen adds texture between repeated rows of balconies.",
    },
    {
      src: "/assets/projects/14.jpg",
      alt: "Tall blue facade screen on a light-colored tower",
      description:
        "A tall blue screen introduces color and vertical emphasis to the tower facade.",
    },
    {
      src: "/assets/projects/15.jpg",
      alt: "Horizontal facade cladding around large openings and glass balconies",
      description:
        "Fine horizontal cladding wraps broad facade openings beneath glass-fronted balconies.",
    },
    {
      src: "/assets/projects/16.jpg",
      alt: "Wood-toned slats extending from a high ceiling down an interior wall",
      description:
        "Wood-toned slats continue from ceiling to wall, framing a double-height interior.",
    },
    {
      src: "/assets/projects/17.jpg",
      alt: "Fine parallel ceiling slats above a tall interior space",
      description:
        "Fine parallel ceiling slats emphasize the length of a tall interior space.",
    },
    {
      src: "/assets/projects/18.jpg",
      alt: "Blue ceiling baffles within a white frame beside glazed walls",
      description:
        "Blue ceiling baffles and contrasting white supports span a glazed interior.",
    },
  ];
  return (
    <>
      <TitleSection
        title="Architecture, in application."
        subTitle="Explore installations featuring Celestia architectural systems."
      >
        <PhotoGallery photos={photos} />
      </TitleSection>
    </>
  );
}

ProjectPage.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle="Project Gallery"
      description="View project inspirations and completed architectural installations featuring Celestia Designs ceiling systems."
      canonicalPath="/projects"
      ogImage="/assets/projects/1.jpg"
      jsonLd={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ])}
    >
      {page}
    </Layout>
  );
};
