import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase-config'

const Home = ({ isAuth }) => {

  const [postList, setPostList] = useState([])
  const postsCollectionRef = collection(db, "posts")

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc)
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

    getPosts()
  }, [deletePost])

  return (
    <div className="page-content">
        { postList.map((post) => {
          return (
            <div className="post">
              <div className="post-title">{post.title}</div>
              <div className="delete-post">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
              <div className="post-text">{post.postText}</div>
            </div>
          )
        })}
    </div>
  )
}

export default Home