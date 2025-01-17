import React from 'react';
import Card from 'react-bootstrap/Card';
import { IoPersonCircleOutline } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ImProfile } from "react-icons/im";
import Fade from 'react-bootstrap/Fade';
import { useState } from 'react';

function UserProfile() {
  const [open, setOpen] = useState(false);
  return (
    <div className=" align-items-center vh-100">
      <div className='d-flex justify-content-between'>
          <h4>Profile Update!</h4>
          <ImProfile size={30} onClick={() => setOpen(!open)}
        aria-controls="example-fade-text"
        aria-expanded={open} />
          </div>
          <div style={{ minHeight: '150px' }}>
        <Fade in={open} dimension="width">
          <div id="example-collapse-text">
          <Card style={{ width: '30rem', padding: '20px' }}>
        <Card.Body className="text-center">
          <IoPersonCircleOutline size={200} style={{ color: 'black' }} />
          <br />
          <Form.Control type="text" placeholder="Username" className="my-3" />
          <Form.Control type="text" placeholder="GitHub Link" className="mb-3" />
          <Form.Control type="text" placeholder="LinkedIn" className="mb-4" />
          <Button variant="primary" style={{ backgroundColor: '#0d6efd' }}>Update</Button>
        </Card.Body>
      </Card>
          </div>
        </Fade>
      </div>
      
    </div>
  );
}

export default UserProfile;