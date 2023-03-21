import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebaseConfig"

const LogIn = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (error) {
            toast(error.code, { type: "error" })
        }
    }

    return (
        
        <div 
            className="border p-3 mx-auto"
            style={{ maxWidth: 400, marginTop: 60 }}
        >
            <h1>Log In</h1>
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
            <button className="btn btn-primary" onClick={handleLogin}>Log In</button>
        </div>
  )
}

export default LogIn