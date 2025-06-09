import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router'

function Create() {

    const { token } = useContext(AppContext)

    const navigate = useNavigate()

    const [formData, setFormData] = useState({

        title: "",
        body: ""
    })

    const [errors, setErrors] = useState({})

    const handleCreate = async (e) => {

        e.preventDefault()

        const res = await fetch('/api/posts', {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (data.errors) {

            setErrors(data.errors)

        }
        else {

            navigate('/')

        }



    }
    return (
        <>
            <h1 className='mt-12 text-center font-bold text-3xl'>Create a new Post</h1>

            <form onSubmit={handleCreate} className='w-1/2 mx-auto space-y-6 text-center'>

                <div className='mt-6 '>
                    <input type="text" placeholder='Enter a title' className='p-2 border-2 rounded-md w-120' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div>
                {errors.title && <p className='text-red-500 text-xs mt-2'>{errors.title[0]}</p>}
                <div className='mt-6 '>
                    <textarea rows="6" className='p-2 border-2 rounded-md w-120' placeholder='Enter a content' value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })}></textarea>
                </div>
                {errors.body && <p className='text-red-500 text-xs mt-2'>{errors.body[0]}</p>}

                <button className='p-2 bg-green-600 text-white rounded-md w-120 cursor-pointer'>Save</button>

            </form>

        </>
    )
}

export default Create