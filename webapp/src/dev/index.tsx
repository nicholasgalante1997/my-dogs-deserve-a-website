import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../app';

function initApp(){
    const root = createRoot(document.getElementById('page-mount')!);
    root.render(<App />);
}

initApp();