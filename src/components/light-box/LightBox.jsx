import React from "react";
import PreBuiltLightBox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/dist/styles.css";
import Counter from "yet-another-react-lightbox/dist/plugins/counter";
import Captions from "yet-another-react-lightbox/dist/plugins/captions";
import "yet-another-react-lightbox/dist/plugins/captions/captions.css";

function LightBox(props){
  const {open, setOpen, images, sIndex} = props
  return (
    <PreBuiltLightBox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        plugins={[Counter, Captions]}
        index={sIndex}
      />
  )
}

export default LightBox;