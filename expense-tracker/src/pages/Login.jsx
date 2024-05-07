import React from 'react'
import { useState } from 'react'
import useLogin from '../Hooks/useLogin'
import { Link } from 'react-router-dom'
import {Button} from '@/Components/ui/button'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {loading, error, fetchUser} = useLogin()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        await fetchUser(email, password)
    }

  return (
    <div >
        <div className=' bg-slate-500 h-16 flex justify-center items-center px-4 p-20' >
        <h1 className='text-5xl font-bold dark:text-white '>Expense Tracker App</h1>
        </div>
        
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md'>
            <div className='flex flex-col gap-3 justify-center items-center px-12 py-8'>
                <h2 className='text-2xl font-semibold'>Login</h2>
                <form action="post" className='flex flex-col gap-5' onSubmit={onSubmitHandler}>
                    <div className='flex flex-col'>
                        <input type="email"
                        name="email" 
                        id="email"
                        value={email} 
                        className="border border-black rounded-md px-7 py-3"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email' />
                    </div>
                    <div className='flex flex-col'>
                        <input type="password"
                        value={password} 
                        name="password"
                        id="password"
                        className="border border-black rounded-md px-7 py-3"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password' />
                    </div>
                    <input type="submit" disabled={loading} value="Login" className='bg-red-500 text-white rounded-sm px-3 py-2 hover:bg-blue-600 hover:cursor-pointer' />
                    <p>Don't have a account? <Link to={'/register'} className='font-bold hover:cursor-pointer'>Create one</Link></p>
                    <div>
                        {error}
                    </div>
                </form>
            </div>
        </div>
    </div>
    
  )
}
