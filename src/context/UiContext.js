import React , {createContext, useState} from 'react';

export const UiContext  = createContext();

export const UiProvider = ({ children }) => {
    const  [hideMenu, setHideMenu] = useState(false);

    const showMenu = () => {
        setHideMenu( false );
    }

    const hideMenuf = () => {
        setHideMenu( true );
    }

    return (
        <UiContext.Provider value = {{
            hideMenu,
            showMenu,
            hideMenuf
        }}>
            { children }
        </UiContext.Provider>
    )
}