import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'

const Home = () => {

  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, "posts")

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs()
    }
  })

  return (
    <div className="page-content">
        <h2>Home</h2>

    </div>
  )
}

export default Home