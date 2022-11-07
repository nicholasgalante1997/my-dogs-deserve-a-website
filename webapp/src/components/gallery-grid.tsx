import React from 'react';
import { S3ImageObject, ContentKeyType } from '../@types';
import LeftArrow from '../svg-assets/left.svg';
import RightArrow from '../svg-assets/right.svg';
import { filterImagesOnParentDir } from '../utils';

const imgSrcTemp = 'https://d2rzwel03lx9wv.cloudfront.net/brothers/IMG_8870.jpg';

type GalleryGridProps = {
    images: S3ImageObject[];
    contentKey: ContentKeyType;
}

export function GalleryGrid({ images, contentKey }: GalleryGridProps){
    const [imageIndex, setImageIndex] = React.useState(0);
    const [activeImages, setActiveImages] = React.useState(filterImagesOnParentDir(contentKey, images));
    React.useEffect(() => {
        setActiveImages(filterImagesOnParentDir(contentKey, images));
        setImageIndex(0);
    }, [contentKey, images]);

    function renderImageGallery(){
        return (
          <div className="gallery-container">
            <div id="gallery-panel-left">
                <LeftArrow className="icon" />
            </div>
            <div id="gallery-img-container">
               <img className="gallery-img" src={activeImages[imageIndex].url ?? imgSrcTemp} /> 
               <div id="gallery-text-box">
                    Some mock image text to see what it looks like with a caption under the image
               </div>
            </div>
            <div id="gallery-panel-right">
                <RightArrow className="icon" />
            </div>
          </div>
        );
    }

    function renderImageUploader(){
        return (
            <div>
                upload
            </div>
        )
    }

    if (activeImages.length === 0) {
        return (<div>loading...</div>)
    }

    return (contentKey === 'upload') ? renderImageUploader() : renderImageGallery();
}