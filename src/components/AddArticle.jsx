import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { auth, db, storage } from '../firebaseConfig'

const AddArticle = () => {

    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        createdAt: Timestamp.now().toDate()
    })

    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] })
    }

    const handlePublish = () => {
        if(!formData.title || !formData.description || !formData.image) {
            alert("Please fill out all fields")
            return;
        }

        const storageRef = ref(storage, `/imgaes/${Date.now()}${formData.image.name}`)

        const uploadImage = uploadBytesResumable(storageRef, formData.image)

        uploadImage.on("state_changed",
            (snapshot) => {
                const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            setProgress(progressPercent)
            },
            (err) => {
                console.log(err)
            },
            () => {
                setFormData({
                    title: "",
                    description: "",
                    image: ""
                })

                getDownloadURL(uploadImage.snapshot.ref)
                    .then((url) => {
                        const articleRef = collection(db, "Articles")
                        addDoc(articleRef, {
                            title: formData.title,
                            description: formData.description,
                            imageUrl: url,
                            createdAt: Timestamp.now().toDate(),
                            createdBy: user.displayName,
                            userId: user.uid,
                            likes: [],
                            comments: []
                        })
                            .then(() => {
                                toast("Article added successfully", { type: "success" })
                                setProgress(0)
                            })
                            .catch(err => {
                                toast("Error adding article", { type: "error" })
                            })
                    })
            }
        )

        navigate("/")
    }

    return (
        <div 
            className="border p-3 mx-auto"
            style={{ maxWidth: 400, marginTop: 60 }}
        >
            {
                !user ?
                <>
                    <h2>
                        <Link to="/login">Log in to create a blog post</Link>
                    </h2>
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </>
                :
                <>
                    <h2>Create Article</h2>
                    <label htmlFor="">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        className="form-control" 
                        value={formData.title} 
                        onChange={(e) => handleChange(e)}
                    />

                    <label htmlFor="">Description</label>
                    <textarea 
                        name="description" 
                        className="form-control" 
                        value={formData.description}
                        onChange={(e) => handleChange(e)}
                    />

                    <label htmlFor="">Image</label>
                    <input 
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        className="form-control"
                        onChange={(e) => handleImageChange(e)}
                    />
                    { progress === 0 ? null : (
                        <div className="progress mt-2">
                            <div className="progress-bar progress-bar-striped" style={{ width: `${progress}%`}}>
                                `uploading image ${progress}%`
                            </div>
                        </div>
                    )}

                    <button className="form-control btn btn-primary mt-2" onClick={handlePublish}>Publish</button>
                </>
            }
        </div>
    )
}

export default AddArticle