import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => navigate('/'));
  };
  return <button className="btn btn-logout" onClick={handleLogout}>Sign Out</button>;
};

export function UserDashboard() {
  const user = auth.currentUser;
  return (
    <div className="container">
      <div className="card">
        <h2>User Dashboard</h2>
        <div style={{margin: '20px 0'}}>
            <img src={user?.photoURL} style={{borderRadius:'50%', width:'80px'}} alt="Profile"/>
            <p>Welcome, {user?.displayName}</p>
        </div>
        <div style={{background: 'rgba(255,255,255,0.1)', padding:'15px', borderRadius:'10px'}}>
            <p>Status: Member</p>
            <p>Access Level: Standard</p>
        </div>
        <LogoutBtn />
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const user = auth.currentUser;
  return (
    <div className="container">
      <div className="card" style={{borderColor: '#ff4757'}}>
        <h2 style={{color: '#ff4757'}}>ADMIN PANEL</h2>
        <div style={{margin: '20px 0'}}>
            <img src={user?.photoURL} style={{borderRadius:'50%', width:'80px', border:'2px solid #ff4757'}} alt="Profile"/>
            <p>Commander {user?.displayName}</p>
        </div>
        <div style={{display:'grid', gap:'10px', textAlign:'left'}}>
            <div style={{background: 'rgba(0,0,0,0.3)', padding:'10px'}}>User Count: 1,240</div>
            <div style={{background: 'rgba(0,0,0,0.3)', padding:'10px'}}>System Health: 100%</div>
        </div>
        <LogoutBtn />
      </div>
    </div>
  );
}