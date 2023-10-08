import React from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import LightBox from '../light-box/LightBox';
import ImagesGrid from '../image-grid/ImagesGrid';
import {getImages} from '../../api/images-data';
import './Gallery.css';

const transformData = (images) => {
  // pre process data to be supported by gallery and light-box
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

const START_PAGE = 1

// max limit like 30 is probably better to avoid many request
const PER_PAGE = 10 

function Gallery() {

  const [page, setPage] = React.useState(START_PAGE)
  const perPage = PER_PAGE
  const [images, setImages] = React.useState([])
  const [lightBoxCurrentImageIndex, setLightBoxCurrentImageIndex] = React.useState(0)

  const [open, setOpen] = React.useState(false);
  

  React.useEffect(() => {
    getImages(page, perPage).then((data) => {
      const transformedData = transformData(data)
      setImages((prevImages) => [...prevImages, ...transformedData])
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, [page, perPage])


  const onLightBoxOpen = (index) => {
    setLightBoxCurrentImageIndex(index)
    setOpen(true)
  }

  return (
    <>
      <h1 className='heading'>Unsplash Gallery</h1>
      <ImagesGrid
        images={images}
        onLightBoxOpen={onLightBoxOpen}
      />
      <LightBox
        open={open}
        setOpen={setOpen}
        images={images}
        index={lightBoxCurrentImageIndex}
      />
      <InfiniteScroll 
        dataLength={images.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}/>
    </>
  );
}

export default Gallery;
