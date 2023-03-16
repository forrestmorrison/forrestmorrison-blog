import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebaseConfig"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, {displayName: name})
            navigate("/")
        } catch (error) {
            toast(error.code, { type: "error" })
        }
    }

    return (
        <div className="boder p-3 bg-light" style={{ marginTop: 70 }}>
            <h1>Register</h1>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="enter your name"
                    onChange={(e) => {setName(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="enter your email"
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </div>
            <br/>
            <button className="btn btn-primary" onClick={handleSignup}>Register</button>
        </div>
    )

}

export default Register