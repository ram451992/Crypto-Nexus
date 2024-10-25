import { useState, createContext, useContext } from 'react';

export const CryptoNexusContext = createContext();

export const CryptoNexusContextProvider = ({children}) => {
    const [data, setData] = useState({gainers:[],losers:[],hot:[]});

    return (<CryptoNexusContext.Provider value={{data,setData}}>
        {children}
    </CryptoNexusContext.Provider>);
};
