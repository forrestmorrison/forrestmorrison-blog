import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "./firebaseConfig";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }

  return (
    <main>
      <Router>
        <nav>
          <Link to="/"> Home </Link>
          { !isAuth ? (
            <Link to="/login"> Log In </Link>
          ) : (
            <>
              <Link to="/createpost"> Create New Post </Link>
              <button onClick={signUserOut}>Log Out</button>
            </> 
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;