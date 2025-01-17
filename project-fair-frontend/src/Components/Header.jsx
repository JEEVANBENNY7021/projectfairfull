import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaFileCode } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { authContextResponse } from '../ContextAPI/AuthContext';

function Header() {
  const navigate=useNavigate()
  const{isAuthorized,setIsAuthorized}=useContext(authContextResponse)

  const handlelogout=()=>{
    sessionStorage.clear()
    navigate('/login')
    window.location.reload()
  }
  return (
    <div>
      <Navbar 
        style={{
          background: 'linear-gradient(90deg, #000000 0%, #333333 100%)', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' 
        }} 
        variant="dark"
      >
        <Container>
          <Navbar.Brand 
            href="#home" 
            style={{
              fontSize: '1.5rem',
              color: '#f1f1f1', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.3s ease'
            }}
            className="navbar-brand-hover"
          >
            <FaFileCode size={28} color="#ffffff" />
            Project Fair
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {
              isAuthorized?
              <button className='btn btn-danger p-2 fs-6' onClick={handlelogout}>Logout</button>: <Navbar.Text style={{ color: '#bfbfbf', fontSize: '1.1rem' }}>
              Showcasing Your Best Projects
            </Navbar.Text>
            
            }
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
