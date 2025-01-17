import React, { useState } from 'react'
import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function Auth({ register }) {
  const navigate=useNavigate()
  const[userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:""
  })
  const handleRegister=async()=>{
    console.log(userDetails)
    const {username,email,password}=userDetails
    if(!username||!email||!password){
      toast.warn('Please Fill The Form', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      try{
        //API Fetching
        const response=await registerAPI(userDetails)
        console.log(response)
        if(response.status==200){
          toast.success(response.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefi0ned,
            theme: "light",
            });

            setTimeout(() => {
              navigate('/login')
            }, 6000);
        }
        else{
          toast.error(response.response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
      }
      catch(err){

      }
    }
    }
    const handleLogin = async () => {
      console.log(userDetails);
      const { email, password } = userDetails;
    
      if (!email || !password) {
        toast.warn('Please Fill The Form', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        try {
          // API Fetching
          const response = await loginAPI({ email, password })
          console.log(response);
    
          if (response.status === 200) {
            toast.success('Login Successful..', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate('/')
            }, 6000);

            //to store username in session storage
            sessionStorage.setItem("username",response.data.currentUser.username)
            sessionStorage.setItem("token",response.data.token)
          } else {
            toast.error(response.response.data, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (err) {
          console.error(err);
          toast.error('Something went wrong. Please try again.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    };
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <img src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" style={{ width: '700px' }} alt="" />
          </div>
          <div className="col-1"></div>
          <div className='col-5 my-5'>
            <form>
              <h1 className='text-center mt-4'>Project Fair</h1>
              <h2 className='text-center'>Sign{register ? '-Up' : '-In'}</h2>
              {
                register &&
                <MDBInput className='mb-4' type='text' id='form2Example1' label='Username' onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})} />
              }
              <MDBInput className='mb-4' type='email' id='form2Example1' label='Email address' onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})} />
              <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})} />



              {
                register ?
                  <div>
                    <MDBBtn type='button' className='mb-4' block onClick={handleRegister}>
                      Sign Up
                    </MDBBtn>

                    <div className='text-center'>
                      <p>
                        Already Registered? <Link to={"/login"}>Login</Link>
                      </p>
                    </div>
                  </div>

                  :
                  <div>
                    <MDBBtn type='button' className='mb-4' block onClick={handleLogin}>
                      Sign in
                    </MDBBtn>

                    <div className='text-center'>
                      <p>
                        Not a member? <Link to={"/register"}>Register</Link>
                      </p>
                    </div>
                  </div>

              }
            </form>
          </div>
        </div>

      </div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}

export default Auth