import React, { useState } from 'react';

// TODO
const url = 'http://localhost:3003/users';

// const SignupPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const [login, setLogin] = useState(false);
//   const [error, setError] = useState([]);
//   const [message, setMessage] = useState('');

//   const [currentUser, setCurrentUser] = useState(null);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('Signing up...');

//     const user = {
//       username,
//       password
//     }

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });

//       console.log(response)

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data)
//         setMessage(data.message || 'Signup successful!');
//         // Clear the form
//         setUsername('');
//         setPassword('');
//       } else {
//         const errorData = await response.json();
//         setMessage(errorData.message || 'Signup failed. Please try again.');
//       }
//     } catch (error) {
//       ressponse.json().then((e) => setErrors(Object.entries(e.error).flat()));

//       console.error('Error during signup:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };


//   return (
//     <div>
//       <h1>Register</h1>
//       <div className="register">
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Username
//               <br />
//               <input
//                 type="text"
//                 value={username}
//                 required
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </label>
//           </div>

//           <div>
//             <label>
//               Password
//               <br />
//               <input
//                 type="password"
//                 value={password}
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </label>
//           </div>

//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


const SignupPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((r) => r.json())
      .then(onLogin);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="password_confirmation">Confirm Password:</label>
      <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignupPage;
