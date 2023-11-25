import React from 'react'
import Register from './LoginAndRegistrationForm'
import axios from 'axios'
import Route from './Route';
import { UserContextProvider } from './UserContext';



function App() {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.withCredentials=true;
  

  
  return (
    <UserContextProvider>
       <Route />
    


    </UserContextProvider>
    
   
  )
}

export default App