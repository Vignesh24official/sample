import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// We don't need index.css if we are using App.css, 
// but you can leave it if your vite setup created it.













ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)