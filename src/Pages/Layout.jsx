import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Link } from 'react-router'
import { AppContext } from '../Context/AppContext'

function Layout() {

  const { user ,token,setUser,setToken} = useContext(AppContext)

  const navigate = useNavigate()

   const handleLogout = async (e) => {

    e.preventDefault()

    const res = await fetch('/api/logout', {
            method:"post",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const data = await res.json()

    console.log(data)

    if(res.ok){
      setToken(null)
      setUser(null)
      localStorage.removeItem('token')
    }

    navigate('/')
     
    }

    return (
    <>
      <header className='bg-gray-500 h-30 p-4'>
        <nav className='text-xl text-white flex items-center justify-between mt-4 '>
          <Link to='/' className='hover:bg-neutral-500 hover:p-2 hover:rounded-md'>Home</Link>
          {user ? (<div className=' space-x-4 flex'><p>Welcome back {user.name}</p>
            <form onSubmit={handleLogout}>
              <button className='hover:bg-neutral-500 hover:p-2 hover:rounded-md'>Logout</button>
            </form>
          </div> ) : (<div className='space-x-4'>
            <Link to='/register' className='hover:bg-neutral-500 hover:p-2 hover:rounded-md'>Register</Link>
            <Link to='/login' className='hover:bg-neutral-500 hover:p-2 hover:rounded-md'>Login</Link>
          </div>)}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
  }

  


export default Layout