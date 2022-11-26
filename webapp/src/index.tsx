import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppWithHydratedContext } from './app';

function initApp(){
    const root = createRoot(document.getElementById('page-mount')!);
    root.render(
      <AppWithHydratedContext />
    );
}

initApp();