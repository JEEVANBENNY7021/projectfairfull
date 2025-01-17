import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { serverUrl } from '../../Services/serverURL';
function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div>
      <div className='d-flex justify-content-center mt-3 p-5'>
    <Card style={{ width: '18rem' }} className='m-3' onClick={handleShow}>
      <Card.Img variant="top" src={project?`${serverUrl}/uploads/${project.projectImg}`:'https://cdn.mos.cms.futurecdn.net/cVbSaRQuJxjEeZh3q5CNhE-1200-80.jpg'} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Text>
         
        </Card.Text>
      </Card.Body>
    </Card>

      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <div className='row' style={{width: '650px' }}>
            <div className='col-6'>
          <img src={project?`${serverUrl}/uploads/${project.projectImg}`:'https://cdn.mos.cms.futurecdn.net/cVbSaRQuJxjEeZh3q5CNhE-1200-80.jpg'} alt="" style={{width: '18rem' }} />
          </div>
          <div className='col-6'>
          <h2>Description</h2>
          <p>{project.overview}</p>
          <h2>Technologies</h2>
          <p>React,JavaScript</p>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    {/* <Card style={{ width: '18rem' }} className='mx-3'>
      <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/cVbSaRQuJxjEeZh3q5CNhE-1200-80.jpg" />
      <Card.Body>
        <Card.Title>Game App</Card.Title>
        <Card.Text>
          
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }} className='mx-3'>
      <Card.Img variant="top" src="https://cdn.mos.cms.futurecdn.net/cVbSaRQuJxjEeZh3q5CNhE-1200-80.jpg" />
      <Card.Body>
        <Card.Title>Media App</Card.Title>
        <Card.Text>
         
        </Card.Text>
        
      </Card.Body>
    </Card> */}
</div>

    </div>
  )
}

export default ProjectCard