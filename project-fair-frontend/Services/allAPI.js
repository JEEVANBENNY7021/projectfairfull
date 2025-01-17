import {commonAPI} from '../Services/commonAPI'
import {serverUrl} from '../Services/serverURL'

export const registerAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/register`,reqBody)
}

export const loginAPI=async(reqBody)=>{
    return await commonAPI('post',`${serverUrl}/api/login`,reqBody)
}

export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('post',`${serverUrl}/api/addproject`,reqBody,reqHeader)
}

export const getHomeProjectAPI=async()=>{
    return await commonAPI('get',`${serverUrl}/api/gethomeprojects`,"","")
}

export const getAllUserProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI('get',`${serverUrl}/api/getalluserprojects?search=${searchKey}`,"",reqHeader)
}

export const getParticularUserAPI=async(reqHeader)=>{
    return await commonAPI('get',`${serverUrl}/api/getparticularuserprojects`,"",reqHeader)
}

export const editProjectAPI=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('put',`${serverUrl}/api/editproject/${projectId}`,reqBody,reqHeader)
}

export const deleteProjectAPI=async(projectId,reqHeader)=>{
    return await commonAPI('delete',`${serverUrl}/api/deleteproject/${projectId}`,"",reqHeader)
}