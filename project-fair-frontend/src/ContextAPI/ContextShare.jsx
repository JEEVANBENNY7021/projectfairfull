import React, { createContext, useState } from 'react'

//1 create context
export const addProjectContextResponse = createContext()
export const editProjectContextResponse=createContext()
function ContextShare({children}) {
    //2 create state for holding detials
    const[addContext,setAddContext] = useState("")
    const[editContext,setEditContext] = useState("")
  return (
    <div>
        <addProjectContextResponse.Provider value={{addContext,setAddContext}}>
          <editProjectContextResponse.Provider value={{editContext,setEditContext}}>
          {children}
          </editProjectContextResponse.Provider>
        </addProjectContextResponse.Provider>
    </div>
  )
}

export default ContextShare