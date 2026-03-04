import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';

// ---------------------------------------------------------
// 1. MAKE SURE THIS IS EXACTLY YOUR EMAIL (LOWERCASE)
const ADMIN_EMAIL = "blackpanthervignesh2004@gmail.com"; 
// ---------------------------------------------------------

function Login() {
  const { type } = useParams(); // Gets 'user' or 'admin' from URL
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // 2. Normalize emails to fix case sensitivity issues
      // (Converts 'User@Gmail.com' to 'user@gmail.com')
      const loggedInEmail = user.email.toLowerCase().trim();
      const configAdminEmail = ADMIN_EMAIL.toLowerCase().trim();

      console.log("Logged In As:", loggedInEmail);
      console.log("Required Admin Email:", configAdminEmail);

      // --- LOGIC START ---

      // SCENARIO 1: Trying to access ADMIN Portal
      if (type === 'admin') {
        if (loggedInEmail === configAdminEmail) {
          // Success: Admin matches
          console.log("Admin Access Granted");
          navigate('/admin-dashboard');
        } else {
          // Fail: Wrong email for admin
          console.warn("Admin Access Denied");
          await signOut(auth); // Kick them out
          setError(`INVALID ACCESS: ${loggedInEmail} is not an Admin.`);
        }
      } 
      
      // SCENARIO 2: Trying to access USER Portal
      else {
        // Everyone is allowed here (User AND Admin)
        console.log("User Access Granted");
        navigate('/user-dashboard');
      }

    } catch (err) {
      console.error(err);
      setError("Login Failed: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>{type === 'admin' ? 'Admin Login' : 'User Login'}</h1>
        
        <p style={{ marginBottom: '20px', opacity: 0.8 }}>
          {type === 'admin' 
            ? 'Authorized personnel only.' 
            : 'Welcome! Admin can also login here.'}
        </p>

        {/* Error Message Display */}
        {error && <div className="error-msg">⚠️ {error}</div>}

        <button className="btn btn-google" onClick={handleLogin}>
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="G" 
            style={{width:'20px'}}
          />
          Sign in with Google
        </button>

        <button 
          style={{background:'none', border:'none', color:'white', marginTop:'20px', textDecoration:'underline', cursor:'pointer'}}
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Login;