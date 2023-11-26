import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export const UserContextProvider = ({children})=>{
    const[username,setUsername] =useState(null);
    const[userId,setUserId] = useState(null)

    useEffect(()=>{
        axios.get('/api/profile').then(response =>{
            setUserId(response.data.userId)
            setUsername(response.data.username)
        })

    })

    return(
        <UserContext.Provider value={{username,setUsername,userId,setUserId}}> 
            {children}
        </UserContext.Provider>
    )

}