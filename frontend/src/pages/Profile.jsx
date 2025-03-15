import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {

    const user = useSelector((state)=>state.user.user)
    const [username,setUsername] = useState(user.username)
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState(user.email)

    function handleSubmitChanges(){
        
    }
    
  return (
    <form>
        <h1>Welcome</h1>
        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        <button>Submit Changes</button>
    </form>
  )
}
