import React, { useState } from 'react'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { getAllUserProjectAPI } from '../../Services/allAPI';
import { useEffect } from 'react';
import ProjectCard from '../Components/ProjectCard';

function Projects() {
  const[token,setToken]=useState("")

  const[alluserprojects,setAllUserProjects]=useState([])

  const[searchKey,setSearchKey]=useState("")
console.log(searchKey);

  const getAllUserProjects=async()=>{
    if(token){
      const reqHeader={
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      try {
        const response=await getAllUserProjectAPI(searchKey,reqHeader)
        console.log(response)
        setAllUserProjects(response.data)
      } catch (error) {
        console.log(error);
      }
    }
  }

useEffect(() => {
  setToken(sessionStorage.getItem("token"))
  getAllUserProjects()
}, [token,searchKey])

  return (
    <div>
      <Container className="my-5 text-center">
        <Row className="justify-content-center">
          <Col >
            <h2 className="mb-4">All Projects</h2>
          </Col>
        </Row>


        <Row className="justify-content-center">
          <Col md={6} className='mt-5'>
            <InputGroup className="mb-3 mt-4">
              <FormControl
                placeholder="Search By Technology"
                onChange={e=>setSearchKey(e.target.value)}
              />
              <Button variant="outline-secondary">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <h1 style={{textAlign:'center'}}>EXPLORE OUR PROJECT</h1>   <br /><br />
      <div className='row'>
       {

alluserprojects.length>0?alluserprojects.map(project=>(
         <div className="col-4">
         <ProjectCard project={project}/>
      </div>
        )):"no project found"
       }
      
      
        </div>
      </Container>

    </div>
  )
}

export default Projects