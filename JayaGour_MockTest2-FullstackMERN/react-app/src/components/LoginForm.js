import React, { useRef, useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState(""); 
  const passwordRef = useRef();               

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", passwordRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      <div>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>Password: </label>
        <input type="password" ref={passwordRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
