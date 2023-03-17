import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.css"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import "font-awesome/css/font-awesome.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </React.StrictMode>
);