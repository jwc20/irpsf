import React, { useState } from "react";

const url = 'http://localhost:3003/users';

const SignupForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      user: {
        username,
        password,
        password_confirmation: passwordConfirmation
      }
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignupForm;
