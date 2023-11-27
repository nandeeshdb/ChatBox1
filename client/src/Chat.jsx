
import React, { useEffect, useState } from 'react'
import Avathar from './Avathar'

function Chat() {

    const[ws,setWs]= useState(null)
    const[onlinePeople,setOnlinePeople] =useState({})


    useEffect(()=>{

       const wss =  new WebSocket('ws://localhost:3000')
       setWs(wss)
       wss.addEventListener('message',handleWebSocket)

    },[])

    const showOnlinePeople=(peopleArray)=>{
        const people = {}
        peopleArray.forEach(({userId,username})=>{
            people[userId] = username
        })

        setOnlinePeople(people)

    }

    const handleWebSocket = (e)=>{
        const messageData = JSON.parse(e.data)
        if('online' in messageData){
            showOnlinePeople(messageData.online)
        }

    }
  return (
    <div className='flex h-screen'>
        <div className='bg-blue-50 100 w-1/3 pt-4 pl-4 sm:w-1/4'>
            <div className='font-bold text-blue-600 flex gap-3 mb-4'>
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
</svg>
ChatBox

            </div>
        
        {Object.keys(onlinePeople).map(userId=>(
            <div className='border-b border-gray-200 py-2 flex  items-center gap-8' >
                <Avathar username={onlinePeople[userId] } userId={userId} />
                <span className='text-xl sm:text-2xl '>{onlinePeople[userId]}</span>
            </div>
        ))}
        </div>

        <div className='flex flex-col bg-blue-200 w-3/4 p-4 sm:w-3/4 '>
           
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