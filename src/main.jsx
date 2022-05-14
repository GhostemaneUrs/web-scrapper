import App from './page/index'
import React from 'react'
import './theme/global.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
