import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../firebase-config"


const CreatePost = ({ isAuth }) => {

    let navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [postText, setPostText] = useState("")

    const postsCollectionRef = collection(db, "posts")

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
                title, 
                postText, 
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
            });
        navigate("/")
    }

    useEffect(() => {
        if(!isAuth) {
            navigate("/login")
        }
    }, [])

    return (
        <div className="page-content">
            <h2>New Post</h2>
            <div className="input-group">
                <label>title:</label>
                <input 
                    className="title-input" 
                    placeholder="title..."
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                />
            </div>
            <div className="input-group">
                <label>post:</label>
                <textarea 
                    className="post-input" 
                    rows={10} 
                    placeholder="post..." 
                    onChange={(e) => {
                        setPostText(e.target.value)
                    }}
                />
            </div>
            <button onClick={createPost}>Submit Post</button>
        </div>
    )
}

export default CreatePost