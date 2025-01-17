import React, { createContext, useState } from 'react'
import { useEffect } from 'react'

export const authContextResponse=createContext()

function AuthContext({children}) {
    const[isAuthorized,setIsAuthorized]=useState(false)
    useEffect(() => {
      if(sessionStorage.getItem("token")){
        setIsAuthorized(true)
      }
      else{
        setIsAuthorized(false)
      }
    }, [isAuthorized])
    
  return (
         <authContextResponse.Provider value={{isAuthorized,setIsAuthorized}}>
            {children}
         </authContextResponse.Provider>
  )
}

export default AuthContext