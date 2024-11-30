import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import TitleSection from "@/components/TitleSection";

export default function ProjectPage() {
  const photos = [
    "/assets/projects/1.jpg",
    "/assets/projects/2.jpg",
    "/assets/projects/3.jpg",
    "/assets/projects/4.jpg",
    "/assets/projects/5.jpg",
    "/assets/projects/6.jpg",
    "/assets/projects/7.jpg",
    "/assets/projects/8.jpg",
    "/assets/projects/9.jpg",
    "/assets/projects/10.jpg",
    "/assets/projects/11.jpg",
    "/assets/projects/12.jpg",
    "/assets/projects/13.jpg",
    "/assets/projects/14.jpg",
    "/assets/projects/15.jpg",
    "/assets/projects/16.jpg",
    "/assets/projects/17.jpg",
    "/assets/projects/18.jpg",
  ];
  return (
    <>
      <TitleSection title={"Projects"}>
        <PhotoGallery photos={photos} />
      </TitleSection>
    </>
  );
}
