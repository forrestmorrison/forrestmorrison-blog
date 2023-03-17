import { Routes, Route } from "react-router-dom"
import AddArticle from "./components/AddArticle";
import Article from "./components/Article";
import Articles from "./components/Articles";
import NavBar from "./components/NavBar";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/" element={
          <div 
            className="row"
            style={{ marginTop: 50 }}
          >
            <div className="col-md-8">
              <Articles />
            </div>
            <div className="col-md-4">
              <AddArticle />
            </div>
          </div>
        } />
      </Routes>
      <NavBar />
      
    </div>
  );
}

export default App;