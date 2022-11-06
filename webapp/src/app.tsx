import React from 'react';
import '../styles/app.css';

import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
const credentials = { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'undefined', 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'undefined'
};

console.log({ credentials });

const client = new S3Client({ region: 'us-west-2', credentials });

const imgSrcTemp = 'https://d2rzwel03lx9wv.cloudfront.net/brothers/alex-perz-S6Qo8h_1QVY-unsplash.jpg';

function NavLite() {
    return (
        <header id="main-heading-row">
            <h2>Chief and Dumpling&apos;s very own webpage</h2>
        </header>
    );
}

function ContentController(){
    const options = [
        {
            key: 'home',
            text: 'home'
        },
        {
            key: 'chief',
            text: 'chief'
        },
        {
            key: 'dumpling',
            text: 'dumpling'
        }
    ];
    return (
        <div className="content-controller">
            {options.map(o => (
                <div>
                    {o.text}
                </div>
            ))}
        </div>
    );
}

function GalleryGrid(){
    return (
        <div className="gallery-container">
            <img className="gallery-img" src={imgSrcTemp} />
        </div>
    );
}

function ContentGrid(){
    return (
        <div className="main-grid">
            <ContentController />
            <GalleryGrid />
        </div>
    )
}

export function App () {
    const [bucketList, setBucketList] = React.useState<any[]>();
    React.useEffect(() => {
        (async () => {
            try {
                const fetchedBuckets = await client.send(new ListBucketsCommand({}));
                console.log(fetchedBuckets);
            } catch(e: any) {
                console.error('error: ' + (e as Error).message);
            } finally {
                console.log('s3 call complete')
            }
        })()
    }, []);
    return (
        <section id="main-view">
            <NavLite />
            <ContentGrid />
        </section>
    );
}