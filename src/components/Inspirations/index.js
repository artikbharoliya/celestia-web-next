import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import styles from './Inspirations.module.scss';

function Inspiration() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/1.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Lynx Planks, installed in mix configuration in exterior soffit</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/3.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Arlies in wood finish for collaborative office space</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/4.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Arlies installed in exterior setting</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/5.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Lynx over standard layin ceiling</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/6.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Orion in wood print without endcaps.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/7.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Arlies silver finish in office</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className={styles.imageContainer}>
          <Image
            src={'/assets/inspirations/8.jpg'}
            alt="Lynx plank"
            style={{ objectFit: 'cover' }}
            fill
            sizes='100vw'
            width={0}
            height={0}
          />
        </div>
        <Carousel.Caption className={styles.captionContainer}>
          <p>Arlies plank in wood finish</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Inspiration;