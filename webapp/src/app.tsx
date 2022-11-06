import React from 'react';

import '../styles/app.css';

function NavLite() {
    return (
        <header id="main-heading-row">
            <h2>Every dog deserves a website. Sometimes two.</h2>
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