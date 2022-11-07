import React from 'react';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';
import { NavLite, ContentGrid } from './components';
import '../styles/app.css';

const credentials = { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'undefined', 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'undefined'
};

const client = new S3Client({ region: 'us-west-2', credentials });

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