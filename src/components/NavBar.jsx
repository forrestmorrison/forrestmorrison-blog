import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'

const NavBar = () => {

    const [user] = useAuthState(auth)

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