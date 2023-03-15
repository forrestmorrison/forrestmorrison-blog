import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebaseConfig"
import { signInWithPopup } from "firebase/auth"

const Login = ({setIsAuth}) => {

    let navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/")
        })
    }

    return (
        <div className="page-content">
            <p>Sign in with Google to continue.</p>
            <button onClick={signInWithGoogle}>
                sign in with Google
            </button>
        </div>
    )
}

export default Login