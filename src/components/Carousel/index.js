import { useEffect, useRef, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import Link from "next/link";
import styles from "./Carousel.module.scss";

// Keep the image, alternative text and visible caption together when editing slides.
const slides = [
  {
    src: "/assets/carousel/2.jpeg",
    alt: "Wood-look linear ceiling above an office lounge with green seating",
    caption: "Linear ceiling systems / Office interior",
  },
  {
    src: "/assets/carousel/1.jpeg",
    alt: "Open metal baffle profiles integrated with a suspended ceiling",
    caption: "Metal baffles / Profile detail",
  },
  {
    src: "/assets/carousel/3.jpeg",
    alt: "Wood-look linear ceiling and pendant lighting above a dining area",
    caption: "Linear ceiling systems / Hospitality interior",
  },
];

export default function ControlledCarousel() {
  const carousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  // Bootstrap owns the timer and swipe gestures. Pausing while reading does not
  // change the visitor's explicit pause preference.
  const playing = !paused && !hovered && !focused && !reducedMotion;
  return (
    <section
      className={styles.heroCarousel}
      aria-label="Architectural applications"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <Carousel
        ref={carousel}
        activeIndex={index}
        onSelect={setIndex}
        interval={playing ? 7000 : null}
        controls={false}
        indicators={false}
        fade
        slide={!reducedMotion}
        pause={false}
      >
        {slides.map((slide, slideIndex) => (
          <Carousel.Item
            key={slide.src}
            aria-label={`Image ${slideIndex + 1} of ${slides.length}`}
          >
            <div className={styles.imageFrame}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={slideIndex === 0}
                sizes="(max-width: 1600px) 92vw, 1500px"
                className={styles.image}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className={styles.captionBar}>
        <div
          className={styles.caption}
          aria-live={playing ? "off" : "polite"}
          aria-atomic="true"
        >
          <span className={styles.count}>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <span>{slides[index].caption}</span>
        </div>
        <div className={styles.controls}>
          <Link href="/projects" className={styles.projectLink}>
            View projects <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            onClick={() => setPaused(!paused)}
            disabled={reducedMotion}
            aria-label={
              reducedMotion
                ? "Autoplay disabled for reduced motion"
                : paused
                  ? "Play slideshow"
                  : "Pause slideshow"
            }
          >
            <span aria-hidden="true">
              {paused || reducedMotion ? "▷" : "Ⅱ"}
            </span>
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => carousel.current.prev()}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => carousel.current.next()}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
