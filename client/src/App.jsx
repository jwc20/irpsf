// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import LobbyPage from './pages/LobbyPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={ <HomePage /> } />
          <Route path="/lobby" element={ <LobbyPage /> } />
          <Route path="/signup" element={ <SignupPage /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
