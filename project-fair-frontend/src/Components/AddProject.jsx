import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addProjectAPI} from '../../Services/allAPI';
import { addProjectContextResponse } from '../ContextAPI/ContextShare';
function AddProject() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImg:""
  })

  const{addContext,setAddContext}=useContext(addProjectContextResponse)

const handleAddProject=async()=>{
  console.log(projectDetails)
  const {title,language,github,website,overview,projectImg}=projectDetails
  if(!title||!language||!github||!website||!overview||!projectImg){
    alert("Please fill the form")
  }
  else{
    //create reqBody
    const reqBody=new FormData()
    reqBody.append("title",title),
    reqBody.append("language",language),
    reqBody.append("github",github),
    reqBody.append("website",website),
    reqBody.append("overview",overview),
    reqBody.append("projectImg",projectImg)

    //creation of reqHeader
    const token=sessionStorage.getItem("token")
    console.log(token)
    if(token){
      const reqHeader={
         "Content-Type":"multipart/form-data",
         "Authorization":`Bearer ${token}`
      }
      console.log(reqHeader)
//api calling
    try {
      const response=await addProjectAPI(reqBody,reqHeader)
      console.log(response)
      setAddContext(response.data)
      if(response.status==200){
        alert("Project added successfully..")
        setProjectDetails({
          title:"",
          language:"",
          github:"",
          website:"",
          overview:"",
          projectImg:""
        })
        handleClose()
      }
      else{
        alert(response.response.data)
      }
    } catch (err) {
      console.log(err);
      
    }
  }
  }
}

const[preview,setPreview]=useState("")

useEffect(() => {
  if(projectDetails.projectImg){
    setPreview(URL.createObjectURL(projectDetails.projectImg))
  }  
}, [projectDetails.projectImg])


  return (

    <div>

      <Button variant="primary" onClick={handleShow} style={{ backgroundColor: '#0d6efd', }} className='ms-4'>
        ADD
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='row'>
            <div className='col-6'>
              <label>
                <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} />
              <img src={preview?preview:"https://cdn.pixabay.com/photo/2021/12/29/02/10/idea-6900632_640.png"} alt="" style={{ width: '20rem',height:'18rem' }} />
              </label>
              <p className='text-justify text-danger'>Only allows following type formats .png, .jpg, .jpeg</p>
            </div>
            {/* <div className='col-2'></div> */}
            <div className='col-6'>
              <Form.Control type="text" placeholder="Title" onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
              <br />
              <Form.Control type="text" placeholder="Language" onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
              <br />
              <Form.Control type="text" placeholder="Github" onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
              <br />
              <Form.Control type="text" placeholder="Website" onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
              <br />
              <Form.Control type="textarea" placeholder="Overview" onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddProject