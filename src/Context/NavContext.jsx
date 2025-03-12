import { createContext, useState } from "react";



export let ProvContext = createContext()

export function ProvContextProvider({children}){


        const [handelNav, setHandelNav] = useState(false)
     

    return <ProvContext.Provider value={{handelNav, setHandelNav}}>
        {children}
    </ProvContext.Provider>
}