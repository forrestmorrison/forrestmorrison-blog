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
    </div>
  )

}

export default Register