import React from 'react';
import { S3Client } from '@aws-sdk/client-s3';

const credentials = { 
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'undefined', 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'undefined'
};

const client = new S3Client({ region: 'us-east-2', credentials });

export const AWSClientS3Context = React.createContext<typeof client>(client);
export const useAWSClientS3Context = () => React.useContext(AWSClientS3Context);
export function AWSClientS3ContextProvider ({children}: {children: React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[]}) {
    return (
        <AWSClientS3Context.Provider value={client}>
            {children}
        </AWSClientS3Context.Provider>
    );
};