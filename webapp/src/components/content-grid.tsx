import React from 'react';
import { GalleryGrid } from './gallery-grid';
import { ContentController } from './content-controller';

export function ContentGrid(){
    return (
        <div className="main-grid">
            <ContentController />
            <GalleryGrid />
        </div>
    )
}