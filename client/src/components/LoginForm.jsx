import { useState } from "react";

const url = 'http://localhost:3003/login';

const LoginForm = ({ onLogin }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username,
      password
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

    //   console.log(response);

      if (response.ok) {
        const user = await response.json();
        // Clear the form
        setUsername("");
        setPassword("");
        console.log(user);
        onLogin(user);
      } else {
        // const errorData = await response.json();
      }
    } catch (error) {
      // response.json().then((e) => setErrors(Object.entries(e.error).flat()));
      console.error("Error during login:", error);
    //   setMessage("An error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LoginForm;
