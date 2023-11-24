import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

function Register() {
    const[username,setUserName] = useState('')
    const[password,setPassword] = useState('')

    const[loading,setLoading] =useState(false);
    const[error,setError] = useState(false)

    const{setUsername,setUserId} = useContext(UserContext)


    const onSubmitHandler=async(e)=>{
      e.preventDefault();
      
      try {
        setLoading(true)
        setError(false)
      
          const res = await axios.post('/api/register',{username,password},{
          headers:{
            'Content-Type':'application/json'
          }
        })
  
        const data = res.data;
        if(data.success === " false"){
          console.log('user not created')
          setLoading(false)
          setError(true)
        }
  
        console.log('user created')
        setUsername(username)
        setUserId(data.id)
        setLoading(false)
        setError(false)
        
      } catch (error) {
        setError(error)
        setLoading(false)

        
      }

    }
  return (
    <div className='bg-blue-50 h-screen flex items-center'>
        <form className='w-72 mx-auto p-3 mb-12' onSubmit={onSubmitHandler}>
            <input value={username} onChange={(e)=>setUserName(e.target.value)} type='text' placeholder='username'  className='block w-full rounded-lg p-2 mb-4'/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password'  className='block w-full rounded-lg p-2 mb-4 ' />
            <button disabled={loading} className='bg-blue-600 text-white  w-full rounded-lg block p-2 mb-4 hover-opacity-95 disabled:opacity-60'>{
              loading ? 'Loading...' : 'Register'
            }</button>
            {
              error && <p className='text-red-500 font-semibold'>{error}</p>
            }
        </form>

    </div>
  )
}

export default Register