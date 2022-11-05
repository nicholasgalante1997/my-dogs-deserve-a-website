import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('page-mount')!);
root.render(<h1>Rust Based Web Server, pretty tight</h1>);