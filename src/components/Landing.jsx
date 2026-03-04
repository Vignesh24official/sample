import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="grid-container">
        
        {/* User Option */}
        <div className="portal-btn" onClick={() => navigate('/login/user')}>
          <span className="icon">👤</span>
          <h2>User Portal</h2>
          <p style={{fontSize: '0.8rem', opacity: 0.7}}>Access for members</p>
        </div>

        {/* Admin Option */}
        <div className="portal-btn" onClick={() => navigate('/login/admin')}>
          <span className="icon">🔒</span>
          <h2>Admin Portal</h2>
          <p style={{fontSize: '0.8rem', opacity: 0.7}}>Restricted Access</p>
        </div>

      </div>
    </div>
  );
}

export default Landing;