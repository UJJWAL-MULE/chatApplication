import React from 'react'
import { useState, useEffect } from 'react'
import Logo from '../assests/logo.svg' 
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {RegisterRoute} from '../utils/ApiRoutes.js'


const Register = () => {

  const nav= useNavigate()
  const [values,setValues]= useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })

 const toastOptions ={
  position:"top-right",
  autoClose:5000,
  pauseOnHover:true,
  draggable:true,
  theme:"dark"
}

// useEffect(() => {
//   if( localStorage.getItem('chat-app-user')){
//     nav('/')
//   }
//   }, []);


const form_validation=()=>{
const {username , email , password ,confirmPassword} =values
if(password !== confirmPassword ){
  toast.error("password and confirm password should be same", toastOptions)
  return false
}
else if(username.length <3){
  toast.error("username length should me greater than 3 ")
  return false
}
else if(email ===""){
  toast.error("email is required")
  return false
}
return true

}

  const handleSubmit = async (event)=>{
      event.preventDefault()
     try{
      if(form_validation()){
        const {username , email , password ,confirmPassword} =values
        console.log(" in validation " , RegisterRoute)
        
      const {data} = await axios.post(RegisterRoute,{
          username,
          email,
          password
        })
        if(data.status ===false){
          toast.error(data.mes ,toastOptions)
        }
        if(data.status=== true){
          localStorage.setItem('chat-app-user',JSON.stringify(data.user))
          nav('/')
        }
      }
     }
     catch(error){
      toast.error('error during registering' , toastOptions)
     }
  }




  return (
    <>
    <FormContainer>
         
        <form action="" onSubmit={ (event) =>handleSubmit(event)}>
        <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatBox</h1>
        </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={values.username}
            onChange={(e)=>setValues({...values,username:e.target.value})}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={(e)=>setValues( {...values,email:e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={(e)=>setValues( {...values,password:e.target.value})}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={(e)=>setValues({...values,confirmPassword:e.target.value})}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>

    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width:100vw;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:1rem;
background-color: #131324;
.brand{
  display:flex;
  justify-content:center;
  align-items: center;
  gap: 1rem;
  img{
    height: 5rem
  }
  h1{
    color:white;
    text-transform:uppercase ;
  }
}

form{
  display:flex;
  flex-direction: column;
  gap:2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }



`;

export default Register


