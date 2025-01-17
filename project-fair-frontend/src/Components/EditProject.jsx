import { FaEdit } from "react-icons/fa";
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { editProjectAPI } from "../../Services/allAPI";
import { serverUrl } from "../../Services/serverURL";
import { editProjectContextResponse } from "../ContextAPI/ContextShare";

function EditProject({project}) {
  const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const[projectDetails,setProjectDetails]=useState({
      id:project._id,
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
      projectImg:project.projectImg
    })

    const[preview,setPreview]=useState("")
    const{editContext,setEditContext}=useContext(editProjectContextResponse)

    const handleEditProject=async()=>{
      console.log(projectDetails)
      const {id,title,language,github,website,overview,projectImg}=projectDetails
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
        preview?reqBody.append("projectImg", projectImg):reqBody.append("projectImg",project.projectImg)
    
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
          const response=await editProjectAPI(id,reqBody,reqHeader)
          console.log(response)
          if(response.status==200){
            setEditContext(response.data)
            alert("Project Updated..")
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

    // useEffect(() => {
    //   if(projectDetails.projectImg){
    //     setPreview(URL.createObjectURL(projectDetails.projectImg))
    //   }  
    // }, [projectDetails.projectImg])

    useEffect(() => {
      if(projectDetails.projectImg instanceof File){
        setPreview(URL.createObjectURL(projectDetails.projectImg))
      }  
    }, [projectDetails.projectImg])

  return (
    <div>
       <FaEdit style={{color:'green'}} className='mb-3'  onClick={handleShow}/>

       <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='row'>
            <div className='col-6'>
              <label>
                <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} />
              <img src={preview?preview:`${serverUrl}/uploads/${projectDetails.projectImg}`} alt="" style={{ width: '20rem',height:'18rem' }} />
              </label>
              <p className='text-justify text-danger'>Only allows following type formats .png, .jpg, .jpeg</p>
            </div>
            {/* <div className='col-2'></div> */}
            <div className='col-6'>
              <Form.Control type="text" placeholder="Title" value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
              <br />
              <Form.Control type="text" placeholder="Language" onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} value={projectDetails.language} />
              <br />
              <Form.Control type="text" placeholder="Github" onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} value={projectDetails.github} />
              <br />
              <Form.Control type="text" placeholder="Website" onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} value={projectDetails.website} />
              <br />
              <Form.Control type="textarea" placeholder="Overview" onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} value={projectDetails.overview} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProject}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditProject