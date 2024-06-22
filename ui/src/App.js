import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Add from './components/Add';
import Edit from './components/Edit';
import Details from './components/Details';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Profile from './components/authentication/Profile';
import { checkConnection, syncWithServer } from './utils/network';

function App() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const handleConnectionChange = (online) => {
      setIsOffline(!online);
      if (online) {
        syncWithServer(); // Sync with server when online
      }
    };

    // Listen for network connection changes
    window.addEventListener('online', () => handleConnectionChange(true));
    window.addEventListener('offline', () => handleConnectionChange(false));

    // Check connection status when the app loads
    checkConnection().then((online) => setIsOffline(!online));

    return () => {
      window.removeEventListener('online', () => handleConnectionChange(true));
      window.removeEventListener('offline', () => handleConnectionChange(false));
    };
  }, []);

  return (
    <div className="App">
      {isOffline && <div className="offline-message">You are currently offline. Changes will be saved locally.</div>}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/create" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
