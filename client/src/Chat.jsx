
import React, { useEffect, useState } from 'react'
import Avathar from './Avathar'
import Logo from './Logo'
import { useContext } from 'react'
import { UserContext } from './UserContext'

function Chat() {

    const[ws,setWs]= useState(null)
    const[onlinePeople,setOnlinePeople] =useState({})
    const[selectedUserId,setSelectedUserId] = useState(null)

    const{username,userId:id} = useContext(UserContext)


    const onlinePeopleExcOurs = {...onlinePeople}

    delete onlinePeopleExcOurs[id]


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
        <div className='bg-white  w-1/3 pt-4 pl-4 sm:w-1/4'>
            <Logo />
        {Object.keys(onlinePeopleExcOurs).map(userId=>(
            <div onClick={()=>setSelectedUserId(userId)}  >
                <div key={userId} className={"border-b border-gray-200 py-5 flex  items-center gap-8 cursor-pointer" + (userId===selectedUserId ? 'bg-blue-500' : '')} >
                    {
                        userId===selectedUserId && (
                            <div className='w-1 h-12 bg-blue-600'></div>
                        )
                    }
                <Avathar username={onlinePeople[userId] } userId={userId} />
                <span className='text-xl sm:text-2xl '>{onlinePeople[userId]}</span>
                </div>
            </div>
        ))}
        </div>

        <div className='flex flex-col bg-blue-200 w-3/4 p-4 sm:w-3/4 '>
           
           <div className='flex-grow'>
           {
            !selectedUserId && (
                <div className='flex h-full items-center justify-center text-gray-400 text-3xl'>&larr; Please select a person to chat</div>
            )
           }
            
            </div> 

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