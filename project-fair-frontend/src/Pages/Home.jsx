import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import ProjectCard from '../Components/ProjectCard';
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import { getHomeProjectAPI } from '../../Services/allAPI';
import { authContextResponse } from '../ContextAPI/AuthContext';
function Home() {
  const[token,setToken]=useState("")
  const[homeProjects,setHomeProjects]=useState([])
  const{isAuthorized,setIsAuthorized}=useContext(authContextResponse)

  const getHomeProjects=async()=>{
    const response=await getHomeProjectAPI()
    console.log(response)
    if(response.status==200){
      setHomeProjects(response.data)
    }
  }
  console.log(homeProjects)

  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
    }
    else{
      setIsAuthorized(false)
    }
    setToken(sessionStorage.getItem("token"))
    getHomeProjects()
  }, [isAuthorized])

  return (
    <div className='m-3'>
      <div className='row p-5 mt-5 m-2' style={{height:'650px'}}>
        <div className='col-6 text-center mt-5'>
          <h1 className='mb-4'>Project Fair</h1>
          <p className='text-align-justify'>Welcome to Project Fair, the premier platform for showcasing innovation, creativity, and technical expertise. Our mission is to connect talented individuals with a passion for problem-solving, from students and professionals to entrepreneurs and enthusiasts, by providing a space to share their projects and inspire others.</p>
          {
            isAuthorized?<Link to={'/dashboard'}>
            <Button variant="primary" size="lg">
              View Dashboard
            </Button>
            </Link>:<Link to={'/login'}>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          </Link>
          }
        </div>
        <div className='col-6'>
          <img src="https://static.vecteezy.com/system/resources/previews/005/283/048/non_2x/teamwork-concept-in-3d-isometric-design-colleagues-work-together-on-project-team-building-and-collaboration-business-development-web-template-with-people-scene-illustration-for-webpage-vector.jpg" style={{width:'700px'}} alt="" />
        </div>
      </div>
      <h1 style={{textAlign:'center'}}>EXPLORE OUR PROJECT</h1>   <br /><br />
      <div className='row'>
       {

    homeProjects.length>0?homeProjects.map(project=>(
         <div className="col-4">
         <ProjectCard project={project}/>
      </div>
        )):"no project found"
       }
      
      
        </div>
      <div className='container text-center mt-4 p-5'>
        {
          isAuthorized?<Link to={'/projects'}>
          <Button variant="primary" size="lg">
                View projects
              </Button>
              </Link>:""
        }
      
          </div>

    </div>
  )
}

export default Home