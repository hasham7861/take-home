import React from 'react';
import './ImagesGrid.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ImagesGrid(props) {

  const { images, onLightBoxOpen } = props

  return (
      <div className="image-grid">
      {images.map((image, index) => (
        <div className="image-container" key={image.id}>
          <LazyLoadImage
            alt={image.title}
            effect="blur"
            src={image.src}
            height={500} // temporary height needed to enable lazy loading
            onClick={() => {onLightBoxOpen(index)}}
          />
        </div>
      ))}
    </div>
  );
}

export default ImagesGrid;
