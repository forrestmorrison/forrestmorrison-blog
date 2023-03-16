import { Routes, Route } from "react-router-dom"
import AddArticle from "./components/AddArticle";
import Articles from "./components/Articles";
import NavBar from "./components/NavBar";


function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/register" element={<h1>Register Form</h1>} />
        <Route path="/" element={
          <div className="row">
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