import React from 'react';
import { createRoot } from 'react-dom/client';
import { AWSClientS3ContextProvider } from './s3-context';
import { TextJsonProviderComponent } from './store';
import { App } from './app';

function initApp(){
    const root = createRoot(document.getElementById('page-mount')!);
    root.render(
      <AWSClientS3ContextProvider>
        <TextJsonProviderComponent>
          <App />
      </TextJsonProviderComponent>  
      </AWSClientS3ContextProvider>
      
    );
}

initApp();