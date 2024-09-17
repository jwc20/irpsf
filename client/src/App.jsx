import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LobbyPage from "./pages/LobbyPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3003/me");
      console.log(response)
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      } else {
        console.log("No user is currently logged in.");
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (!currentUser) return <LoginPage onLogin={setCurrentUser} />;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
