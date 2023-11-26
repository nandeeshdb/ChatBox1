import React, { useState } from 'react';


function Register() {
    const[username,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[loading,setLoading] =useState(false);
    const[error,setError] = useState(false)
    const[created,setCreater] =useState(false)

    const onSubmitHandler =async(e)=>{
      e.preventDefault();
      try {
        setError(false)
        setLoading(true)
        const res = await fetch('/api/register',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({username,password})
        })

        const data  = res.json();
        if(data.success === 'false'){
          console.log('user not registered')
          setError(false)
          setLoading(false)
        }
        console.log('user registered')
        setError(false)
        setLoading(false)
        setCreater(true)
        
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
            {
              created && <p className='text-green-500 font-semibold'>User Created</p>
            }
        </form>

    </div>
  )
}

export default Register