import React from 'react';
import { ContentKeyType } from '../@types';
import { useTextJson } from '../store';

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
        overrideOnActive.border = '1px solid #8ca1ab';
        overrideOnActive.fontSize = '24px';
        overrideOnActive.color = '#8ca1ab';
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

    function flexibleOnClick (key: ContentKeyType) {
        window.location.hash = key;
        props.setContentKeyType(key);
    }

    const { contentController: { panels }} = useTextJson();

    return (
        <div className="content-controller">
            {panels.map(panel => (
                <ControllerCard 
                    subtext={panel.panelBannerText} 
                    title={panel.panelTitle} 
                    onClick={() => flexibleOnClick(panel.contentKey as ContentKeyType)} 
                    isActive={props.contentKey === panel.contentKey} 
                />
            ))}
        </div>
    );
}