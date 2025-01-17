import React, { useContext, useEffect, useState } from 'react'
import ViewProject from '../Components/ViewProject'
import AddProject from '../Components/AddProject'
import UserProfile from '../Components/UserProfile'
import { authContextResponse } from '../ContextAPI/AuthContext'

function Dashboard() {
  const[username,setUsername]=useState("")
  const{isAuthorized,setIsAuthorized}=useContext(authContextResponse)
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsAuthorized(true)
    }
    else{
      setIsAuthorized(false)
    }
    setUsername(sessionStorage.getItem("username"))
  },[isAuthorized])
  console.log(isAuthorized);
  
  return (
    <div>
      <div className="container">
        <div className="row p-5">
          <h1>Welcome {username}</h1>
          <div className="col-8">
            <div className="row mt-5">
              <div className="col-6">
               <h3>My Projects</h3>
              </div>
              <div className="col-6">
                <AddProject/>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ViewProject/>
              </div>
            </div>
          </div>
          <div className="col-4">
            <UserProfile/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard