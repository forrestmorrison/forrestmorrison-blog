import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'

const NavBar = () => {

    const [user] = useAuthState(auth)

    const navigate = useNavigate()

    const onAddArticle = () => {
        navigate("/add-article")
    }

    return (
        <div className="fixed-top" style={{ backgroundColor: "white" }}>
            <nav className="navbar">
                <div>
                    <Link className="nav-link" to="/">
                        <img 
                            src="4rest-logo.jpg" 
                            height={30} 
                            alt="logo"
                            style={{
                                marginLeft: "10px"
                            }}
                        />
                    </Link>   
                </div>
                <div>
                    {
                        user && (
                            <>
                                <span className="pe-4">
                                    signed in as { user.displayName || user.email }
                                </span>
                                <button 
                                    className="btn btn-success btn-sm me-3"
                                    onClick={() => {onAddArticle()}}
                                >
                                    Add Article
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm me-3"
                                    onClick={() => {signOut(auth)}}
                                >
                                    Log Out
                                </button>
                            </>
                        )
                    }
                </div>
            </nav>
        </div>
    )
}

export default NavBar