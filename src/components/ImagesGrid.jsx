import React from 'react';
import './ImagesGrid.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from 'react-infinite-scroll-component';


import { LightBox } from 'react-lightbox-pack';
import "react-lightbox-pack/dist/index.css";

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

  const [toggle, setToggle] = React.useState(false)
  const [sIndex, setSIndex] = React.useState(0)

    // Handler
	const  lightBoxHandler  = (state, sIndex) => {
		setToggle(state);
		setSIndex(sIndex);
	};

  const transformDataForLightBox = (images) => {
    console.log('transforming img data')
    return images.map((image) => {
      return {
        id: image.id,
        image: image.urls.full,
        description: image.description,
        title: image.alt_description,
      };
    })  
  }


  React.useEffect(() => {
    getImages(page, perPage).then((data) => {
      console.log('load more images:', data)
      const transformedData = transformDataForLightBox(data)
      setImages((prevImages) => [...prevImages, ...transformedData])
    }).catch((error) => {
      console.error('Error:', error);
    })
  }, [page])





  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div className="image-container" key={image.id}  onClick={() => {lightBoxHandler(true, index)}}>
          <LazyLoadImage
            alt={image.title}
            effect="blur"
            src={image.image}
            height={500} // temporary height needed to enable lazy loading
          />
        </div>
      ))}
      <InfiniteScroll dataLength={images.length} next={() => setPage(page + 1)} hasMore={true} loader={<h4>Loading...</h4>}/>

      <LightBox
				state={toggle}
        event={lightBoxHandler}
        data={images}
        imageWidth="60vw"
        imageHeight="70vh"
        thumbnailHeight={50}
        thumbnailWidth={50}
        setImageIndex={setSIndex}
        imageIndex={sIndex}
			/>

    </div>
  );
}

export default ImagesGrid;
