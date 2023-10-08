import React from 'react';
import './ImagesGrid.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from 'react-infinite-scroll-component';

import LightBox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/dist/styles.css";
import Counter from "yet-another-react-lightbox/dist/plugins/counter";
import Captions from "yet-another-react-lightbox/dist/plugins/captions";
import "yet-another-react-lightbox/dist/plugins/captions/captions.css";

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
  const [sIndex, setSIndex] = React.useState(0)

  const [open, setOpen] = React.useState(false);
  

  const transformData = (images) => {
    console.log('transforming img data')
    return images.map((image) => {
      return {
        id: image.id,
        src: image.urls.full,
        description: image.description,
        title: image.alt_description,
        width: image.width,
        height: image.height,
      };
    })  
  }


  React.useEffect(() => {
    getImages(page, perPage).then((data) => {
      console.log('load more images:', data)
      const transformedData = transformData(data)
      setImages((prevImages) => [...prevImages, ...transformedData])
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, [page])


  const onLightBoxOpen = (index) => {
    setSIndex(index)
    setOpen(true)
  }




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
      <InfiniteScroll dataLength={images.length} next={() => setPage(page + 1)} hasMore={true} loader={<h4>Loading...</h4>}/>

    <LightBox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        plugins={[Counter, Captions]}
        index={sIndex}
      />


      

    </div>
  );
}

export default ImagesGrid;
