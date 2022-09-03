import { Component } from "react";
import Cookies from 'js-cookie'
import Axios from 'axios'
import './index.css'

class Signup extends Component{

    state = {
        username: '',
        password: '',
        RePassword: "",
        email: '',
        fullname: '',
        showSubmitErr: false,
        errorMsg: ""
    
      }
      onChangeUsername = event => {
        this.setState({ username: event.target.value })
      }
  
      onChangePassword = event => {
        this.setState({ password: event.target.value })
      }
    
      onChangeRePassword = event => {
        this.setState({ RePassword: event.target.value })
      }
    
      onChangeEmail = event => {
        this.setState({ email: event.target.value })
      }
    
      onChangeFullname = event => {
        this.setState({ fullname: event.target.value })
      }

       onClickLogout = () => {
        const {history} = this.props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      onSubmitSuccess = () => {
        this.setState({ username: '', email: '', password: '', RePassword: '', fullname: '', showSubmitErr: false, errorMsg: "" })
    
        alert("Registration Successful, Proceed to Login");
  
      }
    
      onSubmitFailure = errorMsg => {
        this.setState({ showSubmitErr: true, errorMsg })
      }

      submitForm = async (event) => {
        console.log("submit entered")
        event.preventDefault()
        const { username, password, RePassword, email, fullname } = this.state
        if (username === "" || password === "" || RePassword === "" || email === "" || fullname === "") {
          this.setState({ showSubmitErr: true, errorMsg: "Please fill all entries" })
        } else {
          if (password !== RePassword) {
            this.setState({ showSubmitErr: true, errorMsg: "Passwords did not match", password: "", RePassword: "" })
          } else {
            const response = await Axios.post("http://localhost:3005/register", {
    
              username: username,
              password: password,
              email: email,
              fullname: fullname
    
            })
    
            console.log(response)
            const data = await response.data
            console.log(data)
            if (data === "User created successfully") {
              this.onSubmitSuccess()
            } else {
              this.onSubmitFailure(data)
            }
          }
        }
      }
    
    
      render() {
        const { username, password, RePassword, email, fullname, showSubmitErr, errorMsg } = this.state
       
        return (
          <>
           
            <div  className="login-form-container">
        <form style={{height:"80vh", width:"40vw"}} className="form-container" onSubmit={this.submitForm}>
         
          <h2 style={{color:"white"}}>Register for IMS</h2>

          <div className="input-container"><>
            <label className="input-label" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="username-input-field"
              value={fullname}
              onChange={this.onChangeFullname}
              placeholder="Enter your Full Name"
            />
          </></div>
          <div className="input-container"><>
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Enter your Username"
            />
          </></div>
          <div className="input-container"><>
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="username-input-field"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Enter your Password"
            />
          </></div>
          <div className="input-container"><>
            <label className="input-label" htmlFor="ConfPassword">
              Re-Enter Password
            </label>
            <input
              type="password"
              id="ConfPassword"
              className="username-input-field"
              value={RePassword}
              onChange={this.onChangeRePassword}
              placeholder="Confirm your Password"
            />
          </></div>
          <div className="input-container"><>
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="username-input-field"
              value={email}
              onChange={this.onChangeEmail}
              placeholder="Enter your Email Address"
            />
          </></div>
          <button style={{marginBottom:"16px"}} type="submit" className="login-button">
            Register
          </button>
          
          {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
          </>
        )
      }
    

}

export default Signup