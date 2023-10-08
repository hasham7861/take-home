import React from 'react';
import './ImagesGrid.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const perPage = 10 // 30 aka max limit images per page is probably better to avoid too many api calls
  const [images, setImages] = React.useState([])

  React.useEffect(() => {
    getImages(page, perPage).then((data) => {
      console.log('debug data:', data)
      setImages((prevImages) => [...prevImages, ...data])
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, [page])



  return (
    <div className="image-grid">
      {images.map((image) => (
        <div className="image-container" key={image.id}>
          <LazyLoadImage
            alt={image.alt_description}
            effect="blur"
            src={image.urls.full}
            height={600}/> {/* A temporary height is required else it loads all images at once*/}
        </div>
      ))}
      <InfiniteScroll dataLength={images.length} next={() => setPage(page + 1)} hasMore={true} loader={<h4>Loading...</h4>}/>
    </div>
  );
}

export default ImagesGrid;
