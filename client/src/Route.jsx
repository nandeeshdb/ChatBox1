import React, { useContext } from 'react'


import { UserContext } from './UserContext'
import RegisterAndLoginForm from './RegisterAndLogin'

function Route() {

    const{username,userId} = useContext(UserContext)
    console.log(username)
    console.log(userId)
  return (
    <RegisterAndLoginForm />
  )
}

export default Route