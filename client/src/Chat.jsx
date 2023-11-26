
import React, { useEffect, useState } from 'react'

function Chat() {

    const[ws,setWs]= useState(null)

    useEffect(()=>{

       const wss =  new WebSocket('ws://localhost:3000')
       setWs(wss)
       wss.addEventListener('message',handleWebSocket)

    },[])

    const handleWebSocket = (e)=>{
        console.log('new message',e)

    }
  return (
    <div className='flex h-screen'>
        <div className='bg-blue-50 100 w-1/2'>
            contacts

        </div>

        <div className='flex flex-col bg-blue-200 w-2/3 p-4 '>
           
           <div className='flex-grow'>message of selected contacts</div> 

            <div className='flex gap-2 '>
                <input  
                type='text' 
                placeholder='Enter your message here' 
                className='p-2 flex-grow rounded-md'
                />
                <button className='bg-blue-600 text-white  p-2 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        stroke-width="1.5" stroke="currentColor" 
                        class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>

                </button>
            </div>

        </div>

    </div>
  )
}

export default Chat