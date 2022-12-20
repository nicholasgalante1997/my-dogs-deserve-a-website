import React from 'react';
import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { NavLite, ContentGrid } from './components';
import { S3ImageObject } from './@types';
import { filterS3ObjectsOnFileCriteria, logger } from './utils';
import { useAWSClientS3Context } from './s3-context';
import { AWSClientS3ContextProvider } from './s3-context';
import { TextJsonProviderComponent } from './store';

import '../styles/app.css';

export function App () {
    const [bucketObjectList, setBucketObjectList] = React.useState<S3ImageObject[]>([]);
    const client = useAWSClientS3Context();
    React.useEffect(() => {
        (async () => {
            try {
                logger('info', 'beginning S3 application load...');
                const bucketParams = { Bucket: process.env.AWS_S3_BUCKET_NAME ?? 'my-dogs-deserve-a-website' };
                const fetchedBuckets = await client.send(new ListObjectsCommand(bucketParams));
                setBucketObjectList(filterS3ObjectsOnFileCriteria(fetchedBuckets));
            } catch(e: any) {
                logger('error', (e as Error).message);
            } finally {
                logger('info', 'S3 query complete.')
            }
        })()
    }, []);
    return (
        <section id="main-view">
            <NavLite />
            <ContentGrid images={bucketObjectList} />
        </section>
    );
};

export function AppWithHydratedContext () {
    return (
      <AWSClientS3ContextProvider>
        <TextJsonProviderComponent>
          <App />
        </TextJsonProviderComponent>  
      </AWSClientS3ContextProvider>
    );
};