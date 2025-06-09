import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AppContext } from '../../Context/AppContext'

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    name:"",
    email:"",
    password:"",
    password_confirmation:""
    
  })

  const [errors, setErrors] = useState({})

  const {setToken} = useContext(AppContext)

  const handleRegister = async (e) => {

    e.preventDefault()

    const res =await fetch('/api/register', {
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
        <h1 className='mt-12 text-center font-bold text-3xl '>Register a new account</h1>
    

        <form className='w-1/2 mx-auto space-y-6 text-center' onSubmit={handleRegister}>
          <div className='mt-6 '>
            <input type="text" placeholder='John...' className='p-2  border-2 rounded-md w-120' value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
            {errors.name && <p className='text-red-500 text-xs mt-2'>{errors.name[0]}</p>}
          </div>
          <div className='mt-6 '>
            <input type="text" placeholder='example@test...' className='p-2  border-2 rounded-md w-120' value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
            {errors.email && <p className='text-red-500 text-xs mt-2'>{errors.email[0]}</p>}
          </div>
          <div className='mt-6 '> 
            <input type="password" className='p-2  border-2 rounded-md w-120' value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})} />
          {errors.password && <p className='text-red-500 text-xs mt-2'>{errors.password[0]}</p>}
          </div>
          <div className='mt-6 '>
            <input type="password"  className='p-2  border-2 rounded-md w-120' value={formData.password_confirmation} onChange={(e)=>setFormData({...formData,password_confirmation:e.target.value})} />
          </div >
            <button className='p-2 bg-blue-600 text-white rounded-md w-120 cursor-pointer'>Register</button>
        </form>
    </>
  )
}

export default Register