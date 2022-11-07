import React from 'react';
import { createRoot } from 'react-dom/client';
import { TextJsonProviderComponent } from './store';
import { App } from './app';

function initApp(){
    const root = createRoot(document.getElementById('page-mount')!);
    root.render(
      <TextJsonProviderComponent>
        <App />
      </TextJsonProviderComponent>  
    );
}

initApp();