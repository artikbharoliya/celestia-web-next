
import Image from 'next/image';
import styles from './PhotoGallery.module.scss';
import StackGrid from 'react-stack-grid';

export function PhotoGallery({ photos }) {
  return (
    <div className="py-5">
      <StackGrid columnWidth={"40%"}>
        {photos?.map((photo, index) => {
          return (
            <>
              <div className={styles.photoContainer} horizontal>
                <Image 
                  src={photo}
                  style={{ 
                    objectFit: 'cover',
                  }}
                  fill
                  sizes='100vw'
                  height={0}
                  width={0}
                  alt=""
                />
              </div>
            </>
          );
        })}
      </StackGrid>
    </div>
  );
}