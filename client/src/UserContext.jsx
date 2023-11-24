import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export const UserContextProvider = ({children})=>{
    const[username,setUsername] =useState({});
    const[userId,setUserId] = useState({})

    useEffect(()=>{
        axios.get('/api/profile').then((res)=>{
            console.log(res.data)
        })
      },[])

    return(
        <UserContext.Provider value={{username,setUsername,userId,setUserId}}> 
            {children}
        </UserContext.Provider>
    )

}