import React from 'react';
import { ContentKeyType } from '../@types';

type ContentControllerProps = {
    contentKey: ContentKeyType;
    setContentKeyType: React.Dispatch<React.SetStateAction<ContentKeyType>>;
}

type ControllerCardProps = {
    title: string;
    subtext: string;
    onClick: () => void;
    isActive: boolean;
};

function ControllerCard(props: ControllerCardProps){
    const overrideOnActive: Record<string, string> = {};
    if (props.isActive) {
        overrideOnActive.border = '1px solid black';
        overrideOnActive.fontSize = '24px';
        overrideOnActive.color = 'purple';
        overrideOnActive.overflow = 'hidden';
    }
    return (
        <div style={overrideOnActive} className='controller-card-container' onClick={props.onClick}>
            <div className='controller-card-heading'>
                <h1>{props.title}</h1>
            </div>
            <div className="controller-card-subheading">
                {props.subtext}
            </div>
        </div>
    )
}

export function ContentController(props: ContentControllerProps){
    const options = [
        {
            key: 'home',
            title: 'home',
            onClick(){
                window.location.hash = 'home';
                props.setContentKeyType('home');
            },
            subtext: 'some mock caption subtext for now'
        },
        {
            key: 'chief',
            title: 'chief',
            onClick(){
                window.location.hash = 'chief';
                props.setContentKeyType('chief');
            },
            subtext: 'some mock caption subtext for now'

        },
        {
            key: 'dumpling',
            title: 'dumpling',
            onClick(){
                window.location.hash = 'dumpling';
                props.setContentKeyType('dumpling');
            },
            subtext: 'some mock caption subtext for now'
        },
        {
            key: 'upload',
            title: 'upload',
            onClick(){
                window.location.hash = 'upload';
                props.setContentKeyType('upload');
            },
            subtext: 'some mock caption subtext for now'
        }
    ];
    return (
        <div className="content-controller">
            {options.map(o => (
                <ControllerCard {...o} isActive={props.contentKey === o.key} />
            ))}
        </div>
    );
}