import React, { useContext } from 'react'
import Register from './Register'
import { UserContext } from './UserContext'

function Route() {

    const{username,userId} = useContext(UserContext)
    console.log(username)
    console.log(userId)
  return (
    <Register />
  )
}

export default Route