import React, { useState, useEffect } from 'react';
import { auth, provider } from './firebase'; 
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import './App.css'; // Import the standard CSS

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Listen for Auth State Changes (Persist login on refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Login Function
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    }
  };

  // 3. Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // 4. Loading State
  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="card">
        
        {user ? (
          /* --- LOGGED IN VIEW --- */
          <div className="logged-in-view">
            <div className="profile-image-container">
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className="profile-pic" 
              />
              <div className="status-dot"></div>
            </div>

            <h2>Hello, {user.displayName.split(' ')[0]}!</h2>
            <p>{user.email}</p>

            <button className="btn btn-logout" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : (
          /* --- LOGGED OUT VIEW --- */
          <div className="logged-out-view">
            <h1>Welcome Back</h1>
            <p>Please sign in to access your dashboard.</p>

            <button className="btn btn-login" onClick={handleGoogleLogin}>
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="google-icon"
              />
              Continue with Google
            </button>
            
            <p style={{ marginTop: '20px', fontSize: '0.75rem', opacity: 0.7 }}>
              Secure Authentication via Firebase
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;