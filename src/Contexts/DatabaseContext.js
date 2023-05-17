import { createContext, useEffect, useState} from 'react'
import { loadState, saveState } from '../Storage/storage';

export const DatabaseContext = createContext();
export function DataBaseContextProvider(props)
{
    const [connect, setConnect] = useState(() => {
        const initialState = loadState();
        return initialState !== undefined ? initialState : false;
      });

    //   useEffect(() => {
    //     saveState(connect);
    //   }, [connect]);

    
    return(
        <DatabaseContext.Provider value={[connect,setConnect]}>
            {props.children}
        </DatabaseContext.Provider>
    );
}
export default DatabaseContext;