import React from 'react';
import { GalleryGrid } from './gallery-grid';
import { ContentController } from './content-controller';
import { ContentKeyType, S3ImageObject } from '../@types';

type ContentGridProps = {
    images: S3ImageObject[];
};

export function ContentGrid(props: ContentGridProps){
    const [contentKey, setContentKey] = React.useState<ContentKeyType>('home');
    return (
        <div className="main-grid">
            <ContentController contentKey={contentKey} setContentKeyType={setContentKey} />
            <GalleryGrid images={props.images} contentKey={contentKey} />
        </div>
    )
}