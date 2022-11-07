import React from 'react';
import textJson from './text.json';

export type TextJsonBlobType = typeof textJson;

export const TextJsonContext = React.createContext<TextJsonBlobType>(textJson);
export const useTextJson = () => React.useContext(TextJsonContext);


export const TextJsonProviderComponent = ({ children }: { children: JSX.Element[] | JSX.Element | React.ReactNode[] | React.ReactNode }) => (
    <TextJsonContext.Provider value={textJson}>
        {children}
    </TextJsonContext.Provider>
);  