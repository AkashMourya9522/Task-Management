import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='flex justify-around p-5'>
        <Link className='text-lg font-semibold text-slate-500 ' to={'/sign-up'}>Sign Up</Link>
        <Link className='text-lg font-semibold text-slate-500 ' to={'/sign-in'}>Sign In</Link>
    </div>
  )
}
