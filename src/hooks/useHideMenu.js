import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { UiContext } from '../context/UiContext'

export const useHideMenu = (hide) => {
    const {hideMenuf, showMenu} = useContext(UiContext);
    useEffect(() => {
        if(hide){
            hideMenuf();
        } else{
            showMenu();
        }
    }, [hide, hideMenuf, showMenu]);
}
