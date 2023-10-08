import React from 'react';
import './ImagesGrid.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const getImages = async (page, perPage) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_UNSPLASH_API}/photos?client_id=${process.env.REACT_APP_CLIENT_ID}&page=${page}&per_page=${perPage}`, {
      method: 'GET',
      cache: 'default'
    });
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
    return []
  }
}

function ImagesGrid() {

  const [page, setPage] = React.useState(1)
  const perPage = 10 /*30*/  // Change it back to 30
  const [imagesJsx, setImagesJsx] = React.useState([])

  const getImagesInJsx = (data) => {
    return data.map((image) => (
      <div className="image-container" key={image.alt_description}>
        <LazyLoadImage
          alt={image.alt_description}
          effect="blur"
          src={image.urls.full}
          height={600}/>
      </div>
    ))
  }
  React.useEffect(() => {
    getImages(page, perPage).then((data) => {
     setImagesJsx(getImagesInJsx(data))
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, [page, perPage])

  return (
    <div className="image-grid">
      {imagesJsx}
    </div>
  );
}

export default ImagesGrid;
