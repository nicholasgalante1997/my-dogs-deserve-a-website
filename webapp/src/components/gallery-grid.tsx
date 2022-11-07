import React from 'react';
import LeftArrow from '../svg-assets/left.svg';
import RightArrow from '../svg-assets/right.svg';

const imgSrcTemp = 'https://d2rzwel03lx9wv.cloudfront.net/brothers/IMG_8870.jpg';

export function GalleryGrid(){
    return (
        <div className="gallery-container">
            <div id="gallery-panel-left">
                <LeftArrow className="icon" />
            </div>
            <div id="gallery-img-container">
               <img className="gallery-img" src={imgSrcTemp} /> 
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