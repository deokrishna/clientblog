

import React from 'react'
import {Box, Button, TextField, Typography} from "@mui/material"
import { useState } from 'react';
import {authActions} from "../store"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const [input, setInput] = useState({
    name: "", email:"", password:""
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange= (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

    //send request to the backend server using axios
  const sendRequest = async (type = "login") => {
      //two parameters required : the first one will be the backend url
            //and the second one will be the object containing the json data
        //and store the response in res variavle
        const res = await axios
            .post(`https://serverblog-weld.vercel.app/api/user/${type}` || `http://localhost:5000/api/user/${type}`, {
                name: input.name,
                email: input.email,
                password: input.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
  };


  const handleSubmit= (event) => {
    event.preventDefault(); //prevent sending form data to url and also prevent refreshing
    if(isSignup){
      sendRequest("signup")
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => dispatch(authActions.login()))
      .then( () => navigate("/blogs") )
      .then( data => console.log(data));
    }
    else {
      sendRequest()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => dispatch(authActions.login()))
      .then( () => navigate("/blogs") )
      .then( data => console.log(data));
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex"
                maxWidth={400}
                bgcolor="#f2f2f2" 
                flexDirection="column" alignItems="center"
                justifyContent="center"
                padding={3}
                margin="auto"
                marginTop={5}
                borderRadius={5}
          >
          <Typography variant='h3' padding={3} textAlign="center">
            {isSignup ? "SignUp":"Login"}
          </Typography>
          {isSignup && 
          <TextField value={input.name} onChange={handleChange}
              name= "name"
             placeholder='name' type="text" margin='normal'/>}
          <TextField value={input.email} onChange={handleChange}
              name= "email"
             placeholder="email" type="email" margin='normal'/>
          <TextField value={input.password} onChange={handleChange}
              name= "password"
             placeholder='password' type="password" margin='normal'/>
          
          <Button variant='contained' type="submit" sx={{ borderRadius: 3, marginTop: 3 }} color='warning'>Submit</Button>
          <Button onClick={()=> setIsSignup(!isSignup)} sx={{ borderRadius: 3, marginTop: 3 }}>
            Change To {isSignup ? "Login": "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth