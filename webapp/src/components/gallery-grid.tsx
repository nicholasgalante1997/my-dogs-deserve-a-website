import React from 'react';
import { GetObjectAttributesCommand } from '@aws-sdk/client-s3';
import { S3ImageObject, ContentKeyType } from '../@types';
import { useAWSClientS3Context } from '../s3-context';
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
    const [activeImageMetadata, setActiveImageMetadata] = React.useState<any>();
    const client = useAWSClientS3Context();
    React.useEffect(() => {
        setActiveImages(filterImagesOnParentDir(contentKey, images));
        setImageIndex(0);
    }, [contentKey, images]);
    React.useEffect(() => {
        if (activeImages.length > 0) {
          const imgObj = activeImages[imageIndex];  
          const { key } = imgObj;
          const getObjectParams = { Bucket: process.env.AWS_S3_BUCKET_NAME ?? '', Key: key, ObjectAttributes: ['Content-Type'] };
          (async function () {
            try {
                const objectMetadata = await client.send(new GetObjectAttributesCommand(getObjectParams));
                console.log({ objectMetadata });
            } catch (e: any) {
                console.log(`error: ${(e as Error).message}`);
            }
          })()
        }
    }, [imageIndex, activeImages, images])
    function leftClick () {
        if (imageIndex > 0) {
            setImageIndex(pastIndex => pastIndex - 1);
        }
    }

    function rightClick () {
        if (imageIndex < activeImages.length - 1) {
            setImageIndex(pastIndex => pastIndex + 1);
        }
    }

    function renderImageGallery(){
        return (
          <div className="gallery-container">
            <div id="gallery-panel-left">
                <LeftArrow className="icon" onClick={leftClick} />
            </div>
            <div id="gallery-img-container">
               <img className="gallery-img" src={activeImages[imageIndex].url ?? imgSrcTemp} /> 
               <div id="gallery-text-box">
                    Some mock image text to see what it looks like with a caption under the image
               </div>
            </div>
            <div id="gallery-panel-right">
                <RightArrow className="icon" onClick={rightClick} />
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