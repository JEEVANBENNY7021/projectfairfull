import React, { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { FaGithub } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { deleteProjectAPI, getParticularUserAPI } from '../../Services/allAPI';
import { addProjectContextResponse, editProjectContextResponse } from '../ContextAPI/ContextShare';
import EditProject from './EditProject';



function ViewProject() {
  
  const{addContext,setAddContext}=useContext(addProjectContextResponse)
  const{editContext,setEditContext}=useContext(editProjectContextResponse)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const[token,setToken]=useState("")
  const[userProjects,setUserProjects]=useState([])

  const getUserProjects=async()=>{
    if(token){
      const reqHeader={
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try {
        const response=await getParticularUserAPI(reqHeader)
        console.log(response)
        setUserProjects(response.data)
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  const handleDelete=async(projectId)=>{
    if(token){
      const reqHeader={
        "Content-type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      try {
        const deleteProject=await deleteProjectAPI(projectId,reqHeader)
        console.log(deleteProject)
        alert("Project Deleted..")
        getUserProjects()
      } catch (error) {
        console.log(error);
        
      }
    }
  } 


  useEffect(() => {
    setToken(sessionStorage.getItem("token"))
    getUserProjects()
  }, [token,addContext,editContext])

  return (
    <div>
      {
        userProjects.length>0?userProjects.map(project=>(
          <Card className='mt-3' style={{ maxWidth: '490px' }}>
      <Card.Body className='d-flex justify-content-between align-items-center'>
        <p className='fs-4'>{project.title}</p>
        <div className='d-flex gap-4 fs-3'>
        <FaExternalLinkAlt style={{color:'blue'}} />
        <FaGithub />
        <RiDeleteBinLine style={{color:'red'}}  onClick={()=>handleDelete(project._id)}/>
        <EditProject project={project}/>
        </div>
      </Card.Body>
    </Card>
        )):"no project found"
      }

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
          <div className='row'>
            <div className='col-6'>
            <label>
            <input type="file" style={{display:'none'}} />
              <img src="https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png" alt="" style={{ width: '20rem',height:'18rem' }} />
              </label>
              <p className='text-justify text-danger'>Only allows following type formats .png, .jpg, .jpeg</p>
            </div>
            {/* <div className='col-2'></div> */}
            <div className='col-6'>
              <Form.Control type="text" placeholder="Title" />
              <br />
              <Form.Control type="text" placeholder="Language" />
              <br />
              <Form.Control type="text" placeholder="Github" />
              <br />
              <Form.Control type="text" placeholder="Website" />
              <br />
              <Form.Control type="textarea" placeholder="Overview" />
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
    </div>
  )
}

export default ViewProject