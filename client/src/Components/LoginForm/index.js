import { useState } from "react";
import Cookies from 'js-cookie';
import { useAuth } from "../Auth";
import Axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

import './index.css'

export const LoginForm =()=>{

   const [username, setUsername]=useState('')
   const [password, setPassword]=useState('')
   const [errorMsg, setErrorMsg]=useState('')
   const [showSubmitErr, setShowSubmitErr]=useState(false)

    const auth=useAuth()
    const navigate=useNavigate()

    const  onSubmitSuccess = (jwtToken,username) => {

        Cookies.set('jwt_token', jwtToken, {
            expires: 30,
            path: '/',
        })
       auth.login(username)
       navigate('/profile')
    
    }

    const onSubmitFailure = errorMsg => {
    setErrorMsg(errorMsg)
    setShowSubmitErr(!showSubmitErr)
    setPassword('')
    setUsername('')
       
    }

  const  submitForm = async (event) => {

        event.preventDefault()
       
      if (username==="" || password===""){
        setErrorMsg("Please fill all entries")
        setShowSubmitErr(!showSubmitErr)
      }else{
        const response = await Axios.post("http://localhost:3005/login", {

            username: username,
            password: password,

        })

        console.log(response)
        const data = await response.data
        console.log(data)
        if (response.data.jwtToken && response.data.username) {
            onSubmitSuccess(response.data.jwt_token, response.data.username)
        } else {
            onSubmitFailure(response.data)

        }
      }

        
    }

    const renderPasswordField = () => {
        
        return (
          <>
            <label className="input-label" htmlFor="password">
              Password:
              
            </label>
            <input
              type="password"
              id="password"
              className="username-input-field"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
            />
          </>
        )
      }
    
     const renderUsernameField = () => {
       
        return (
          <>
            <label className="input-label" htmlFor="username">
              Username:
              
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              placeholder="Username"
            />
          </>
        )
      }

      const jwtToken = Cookies.get('jwt_token')
      
        
        

        if (jwtToken !== undefined) {
           navigate('/profile')
        }
        return (
            <>
                

                <div className="login-form-container">
        <form className="form-container" onSubmit={submitForm}>
         
          <h2 style={{color:"white"}}>Inventory Management System</h2>

          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          
          {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
               
            </>
        )
      
        }


