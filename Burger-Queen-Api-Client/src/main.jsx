// Todos los render de los componentes en el
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
            <BrowserRouter>
                <div>
                      <App />
                </div>
             </BrowserRouter>
  </React.StrictMode>,
)