
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

function Home() {

  const [posts , setPosts] = useState([])

  const [searchTerm,setSearchTerm] = useState('')

  // const [loading, setLoading] = useState(false)

  const getPosts = async () => {

    const res = await fetch('/api/posts')
    
    const data = await res.json()
    
    setPosts(data)

  
    
  }
  const handleSearch = (e) => {

    const searchTerm = e.target.value.trim().toLowerCase()

    setSearchTerm(searchTerm)

    if (!searchTerm) {
      getPosts()
      return
    }

    const postSearch = posts.filter((post) => 
      post.title.toLowerCase().includes(searchTerm)
    )
    setPosts(postSearch)
  }
  const sortByTitle = () => {
    const sorted = [...posts].sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))
    setPosts(sorted)
  }
  
  useEffect(() => {  
     getPosts()
  },[])



 
  return (
    <>  
        
        <h1 className='mt-4 text-center font-bold text-3xl'>Latest posts</h1>

        <div className='text-center mt-6'>
          <input type="text" placeholder='Search ...' onChange={handleSearch} className='p-2 border-2 rounded-md w-120' />
          <button onClick={sortByTitle}  className='p-2 bg-blue-600 text-white rounded-md cursor-pointer ml-6'>A-Z</button>
        </div>

        <div className='grid items-center w-1/2 mx-auto mt-4 gap-4'>
          {posts.length > 0 ? posts.map((post) => (
            <div key={post.id} className='p-4 m-2 border rounded-lg shadow-lg'>
              <h2 className='text-xl font-semibold'>{post.title}</h2>
              <small>Created by {post.user.name} on {""} {new Date(post.created_at).toLocaleTimeString()}</small>
              <Link to={`/posts/${post.id}`}  className='p-2 bg-blue-600 text-white rounded-md w-120 cursor-pointer ml-10'>Read More</Link>
            </div>
          )) : <p className='text-center'>No posts available</p>}
        </div>
    </>
  )
}

export default Home