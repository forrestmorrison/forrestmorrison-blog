import React from 'react'

const Register = () => {
  return (
    <div className="boder p-3 bg-light" style={{ marginTop: 70 }}>
        <h1>Register</h1>
        <div className="form-group">
            <label>Name</label>
            <input
                type="text"
                className="form-control"
                placeholder="enter your name"
            />
        </div>
        <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                className="form-control"
                placeholder="enter your email"
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="password"
            />
        </div>
        <br/>
        <button className="btn btn-primary">Register</button>
    </div>
  )

}

export default Register