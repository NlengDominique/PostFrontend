import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AppContext } from '../../Context/AppContext'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email:"",
    password:""
    
  })

  const [errors, setErrors] = useState({})

  const {setToken} = useContext(AppContext)

  const handleLogin = async (e) => {

    e.preventDefault()

    const res =await fetch('/api/login', {
      method:"post",
      body:JSON.stringify(formData)
    })

    const data = await res.json()
    

    if(data.errors){
      setErrors(data.errors)
    }

    else{
      localStorage.setItem('token', data.token)

      setToken(data.token)
      
      navigate('/')
    }
  }
  return (
    <>
        <h1 className='mt-12 text-center font-bold text-3xl '>Login to your new account</h1>
    

        <form className='w-1/2 mx-auto space-y-6 text-center' onSubmit={handleLogin}>
          <div className='mt-6 '>
            <input type="text" placeholder='example@test...' className='p-2  border-2 rounded-md w-120' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
            {errors.email && <p className='text-red-500 text-xs mt-2'>{errors.email}</p>}
          </div>
          <div className='mt-6 '> 
            <input type="password" className='p-2  border-2 rounded-md w-120' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} />
          {errors.password && <p className='text-red-500 text-xs mt-2'>{errors.password[0]}</p>}
          </div>
            <button className='p-2 bg-blue-600 text-white rounded-md w-120 cursor-pointer'>Login</button>
            <p>Don't have an account ? <Link to='/register'>register here</Link></p>
        </form>
    </>
  )
}

export default Login