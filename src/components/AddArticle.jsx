import { Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebaseConfig'

const AddArticle = () => {
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
            }
        )
    }

    return (
        <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
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

            <div className="progress mt-2">
                <div className="progress-bar progress-bar-striped" style={{ width: "50%" }}>
                    50%
                </div>
            </div>

            <button className="form-control btn btn-primary mt-2" onClick={handlePublish}>Publish</button>
        </div>
    )
}

export default AddArticle