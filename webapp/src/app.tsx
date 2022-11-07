import React from 'react';
import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3';
import { NavLite, ContentGrid } from './components';
import { S3ImageObject } from './@types';
import { filterS3ObjectsOnFileCriteria } from './utils';
import '../styles/app.css';

const credentials = { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'undefined', 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'undefined'
};

const client = new S3Client({ region: 'us-east-2', credentials });
const bucketParams = { Bucket: process.env.AWS_S3_BUCKET_NAME ?? 'my-dogs-deserve-a-website' };

export function App () {
    const [bucketObjectList, setBucketObjectList] = React.useState<S3ImageObject[]>([]);
    React.useEffect(() => {
        (async () => {
            try {
                const fetchedBuckets = await client.send(new ListObjectsCommand(bucketParams));
                setBucketObjectList(filterS3ObjectsOnFileCriteria(fetchedBuckets));
            } catch(e: any) {
                console.error('error: ' + (e as Error).message);
            } finally {
                console.log('s3 call complete')
            }
        })()
    }, []);
    React.useEffect(() => console.log({ bucketObjectList }), [bucketObjectList]);
    return (
        <section id="main-view">
            <NavLite />
            <ContentGrid images={bucketObjectList} />
        </section>
    );
}