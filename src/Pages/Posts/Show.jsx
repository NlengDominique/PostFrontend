import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { AppContext } from '../../Context/AppContext'

function Show() {


    const navigate = useNavigate()

    const { id } = useParams()

    const { user, token } = useContext(AppContext)

    const [post, setPost] = useState(null)

    const getPost = async () => {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()

        if (res.ok) {
            setPost(data.post)
        }

    }

    useEffect(() => {
        getPost()
    }, [])

    const handleDelete = async (e) => {

        e.preventDefault()

        if (user && user.id === post.user_id) {

            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            console.log(data)

            if (res.ok) {
                navigate('/')
            }
        }
    }
    return (


        <>
            {post ? <div className='grid items-center w-1/2 mx-auto mt-4 gap-4'>
                <div className='p-4 m-2 border rounded-lg shadow-lg text-gray-950'>
                    <h2 className='text-xl font-semibold'>{post.title}</h2>
                    <h2>{post.body}</h2>
                    <small>Created by {post.user.name} on {""} {new Date(post.created_at).toLocaleTimeString()}</small>
                    {user && user.id === post.user_id && <div className='mt-4'>
                        <Link to={`/posts/update/${post.id}`} className='p-2 bg-amber-600 text-white rounded-md w-120 cursor-pointer ml-10'>Update</Link>
                        <form className='mt-4' onSubmit={handleDelete}>
                            <button className='p-2 bg-red-600 text-white rounded-md w-120 cursor-pointer ml-10' >Delete</button>
                        </form>
                    </div>}

                </div>
            </div> : <p>Post not found</p>}


        </>
    )
}

export default Show