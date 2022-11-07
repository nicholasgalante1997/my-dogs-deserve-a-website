import React from 'react';

export function ContentController(){
    const options = [
        {
            key: 'home',
            text: 'home'
        },
        {
            key: 'chief',
            text: 'chief'
        },
        {
            key: 'dumpling',
            text: 'dumpling'
        }
    ];
    return (
        <div className="content-controller">
            {options.map(o => (
                <div>
                    {o.text}
                </div>
            ))}
        </div>
    );
}