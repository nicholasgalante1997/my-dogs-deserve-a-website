import React from 'react';

import '../styles/app.css';

function NavLite() {
    return (
        <header id="main-heading-row">
            <h2>Rust Based Web Server, pretty tight</h2>
        </header>
    );
}

export function App () {
    return (
        <section id="main-view">
            <NavLite />
        </section>
    );
}