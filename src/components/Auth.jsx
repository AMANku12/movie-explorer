import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Auth.css"

const Login = () => {
  const user= null;
  const [loginpage, setloginpage] = useState(true);
  const [registerData, setregisterData] = useState({
    fullname:"",
    email:"",
    username:"",
    password:"",
  });
  const [loginData, setloginData] = useState({
    username:"",
    password:"",
  });

  const navigate = useNavigate();

  const handleLoginSubmit = async(e)=>{
    e.preventDefault();         // Prevent default form submission behavior -> whuch would refresh the page

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", loginData);
      console.log("register response: ", response.data);
      if(response.data.message==="Success"){
        localStorage.setItem("token", response.data.token); // store token in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // store user in local storage
        alert("Login successful"); // show success message
        navigate("/"); // redirect to homepage
      }else if(response.data.message==="Invalid password"){
        alert("Invalid password"); // show error message
      }else if(response.data.message==="User not found"){
        alert("User not found"); // show error message
      }
    } catch (error) {
      alert("Error in login"); // show error message
      console.log("register error: ", error);
    }
  }

  const handleRegisterSubmit = async(e)=>{
    e.preventDefault();         // Prevent default form submission behavior -> whuch would refresh the page
    console.log("register data submitted:", registerData);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", registerData);
      if(response.data.message==="Success"){
        localStorage.setItem("token", response.data.token); // store token in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user)); // store user in local storage
        alert("Registration successful"); // show success message
        navigate("/"); // redirect to homepage
      }else if(response.data.message==="User already exists"){
        alert("Username already exists"); // show error message
      }

    } catch (error) {
      console.log("register error: ", error);
    }
  }


  return (
    <div className="auth-container">
    <div className='main-container'>
      {loginpage ? (
        // login form
        <form className="logincontainer" onSubmit={handleLoginSubmit}>

          <input type="text" placeholder="Username" className="login-input" 
          onChange={(e)=>{
            setloginData({...loginData, username: e.target.value})
          }}/>

          <input type="password" placeholder="Password" className="login-input" 
          onChange={(e)=>{
            setloginData({...loginData, password: e.target.value})
          }}/>

          <button type='submit' className="login-button">Login</button>
          <p className="register-text">
            Don't have an account? 
            <span>
              <button className="register-button"
               onClick={()=> {setloginpage(false)}}>Register</button>
            </span>
          </p>

        </form>

      ):(
        // Register form
        <form className="logincontainer" onSubmit={handleRegisterSubmit}>

          <input type="text" placeholder='Full Name' className='login-input' onChange={(e)=>{
            setregisterData({...registerData, fullname: e.target.value})
          }}/>

          <input type="email" placeholder='email'  className='login-input'
          onChange={(e)=>{
            setregisterData({...registerData, email: e.target.value})
          }}/>

          <input type="text" placeholder='Set Username' 
          className='login-input'
          maxLength={10}
          minLength={6}
          onChange={(e)=>{
            setregisterData({...registerData, username: e.target.value})
          }}/>

          <input type="password" 
          placeholder='Set Password' 
          className='login-input'
          minLength="6"
          onChange={(e)=>{
            setregisterData({...registerData, password: e.target.value})
          }}/>
          
          <button className="login-button" type='submit'>Register</button>
          
          <p className="register-text">
            Already have an account? 
            <span>
              <button className="register-button" 
               onClick={()=>{setloginpage(true)}}>Login</button>
            </span>
          </p>
        </form>
        
      )}
      <button className="homepage-btn" 
       onClick={()=>{navigate("/")}}>
        Homepage</button>
    </div>
    </div>
  );
};

export default Login;
