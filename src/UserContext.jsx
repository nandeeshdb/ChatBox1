import { createContext, useState } from "react";

export const UserContext = createContext({})

export const UserContextProvider = ({children})=>{
    const[username,setUsername] =useState({});
    const[userId,setUserId] = useState({})

    return(
        <UserContext.Provider value={{username,setUsername,userId,setUserId}}> 
            {children}
        </UserContext.Provider>
    )

}