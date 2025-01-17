import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../src/bootstrap.min.css'
import ContextShare from './ContextAPI/ContextShare.jsx'
import AuthContext from './ContextAPI/AuthContext.jsx'
// import TokenAuthContext from './ContextAPI/TokenAuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextShare>
      <AuthContext>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthContext>
    </ContextShare>
  </StrictMode>,
)
