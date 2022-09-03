import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../Auth";
import Axios from "axios";

const Profile=()=>{

    const [update, setUpdate]=useState(false)
    const [changep, setCP]=useState(false)
    const [viewDetails, setViewDetails]=useState(false)
    const [userData, setUserData]=useState('')
    const [newPassword, setnewPassword]=useState('')
    const [reNewPassword, setReNewPassword]=useState('')
    const [password, setPassword]=useState('')
    const [fullname, setFullName]=useState('')
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [showSubmitErr, setShowSubmitErr]=useState(false)
    const [errorMsg, setErrorMsg]=useState('')

    const navigate=useNavigate()
    const auth=useAuth()

    const handleLogout=()=>{
        auth.logout()
        Cookies.remove('jwt_token')
        navigate('/')
    }

const setChangePassword=()=>{
     setCP(!changep)
}

const changePassword=async(event)=>{

  event.preventDefault()

  if(password==="" || newPassword==="" || reNewPassword==="" ){
    setErrorMsg("Fields Cannot be empty")
    setShowSubmitErr(!showSubmitErr)
  }else if(newPassword===password){
    setErrorMsg("New Password cannot be same as old Password")
    setShowSubmitErr(!showSubmitErr)
  }
  
  else if(newPassword!==reNewPassword){
    setErrorMsg("Passwords do not match")
    setShowSubmitErr(!showSubmitErr)
  }
  else{
    const response = await Axios.put("http://localhost:3005/changepassword", {
      password:password,
      loggedInUser:auth.user,
      newPassword:newPassword,
    })

    if (response.data){
      alert("Passwords changed Successfully")
      setCP(!changep)
      setPassword('')
      setReNewPassword('')
      setnewPassword('')
    }
  }


}

    const setUpdateDetails=()=>{
      setFullName(userData[0].fullname)
      setUsername(userData[0].username)
      setEmail(userData[0].email)

      setUpdate(!update)
    }

    const getDetails=async()=>{

      const response = await Axios.post("http://localhost:3005/getdetails", {
    
              username: auth.user,
            })
            setUserData(response.data)
            setViewDetails(!viewDetails)
    }
   
    const updateDetails=async(event)=>{

      event.preventDefault()

      if(username==="" || email==="" || fullname===""){
        setErrorMsg("Fields Cannot be empty")
        setShowSubmitErr(!showSubmitErr)
      }else{
        const response = await Axios.put("http://localhost:3005/updatedetails", {
          loggedInUser:auth.user,
          username: username,
          password:password,
          email: email,
          fullname: fullname

        })

        if (response.data){
          alert("Updated Successfully")
          setUpdate(!update)
          setViewDetails(!viewDetails)
          setPassword('')
        }
      }


    }

    return(
        <div>
            <h1>Welcome {auth.user}</h1>
            <button type="button" style={{marginLeft:'32px'}} onClick={handleLogout}>Logout</button>
            <button onClick={getDetails} type="button">View Details</button>

        {viewDetails && <div>


          <h2 >Your Profile Details</h2>
          <p>Full Name: {userData[0].fullname}</p>
          <div >
            <p>Username: {userData[0].username}</p>
          </div>
          <div>
            <p>Email: {userData[0].email}</p>
          </div>

          <button type="button" onClick={setUpdateDetails}>Update</button>
          <button type="button" onClick={setChangePassword}>Change Password</button>
        </div>}
 
        {changep && <div>
          <form style={{height:"80vh", width:"50vw"}} className="form-container" onSubmit={changePassword}>
         
         <h2 style={{color:"white"}}>Update your details here</h2>

         
         <div className="input-container"><>
           <label className="input-label" htmlFor="username">
             Enter you current password
           </label>
           <input
             type="password"
             id="username"
             className="username-input-field"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             placeholder=""
           />
         </></div>
         
         <div className="input-container"><>
           <label className="input-label" htmlFor="email">
             Enter your New Password
           </label>
           <input
             type="password"
             id="email"
             className="username-input-field"
             value={newPassword}
             onChange={(e)=>setnewPassword(e.target.value)}
             placeholder=""
           />
         </></div>
         <div className="input-container"><>
           <label className="input-label" htmlFor="NewPW">
             Re-Enter your New Password
           </label>
           <input
             type="password"
             id="NewPW"
             className="username-input-field"
             value={reNewPassword}
             onChange={(e)=>setReNewPassword(e.target.value)}
             placeholder=""
           />
         </></div>
         <button style={{marginBottom:"16px"}} type="submit" className="login-button">
           Change Password
         </button>
         
         {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
       </form>
                      
        </div> }
         
        {update && <div> 
          <form style={{height:"80vh", width:"50vw"}} className="form-container" onSubmit={updateDetails}>
         
         <h2 style={{color:"white"}}>Update your details here</h2>

         <div className="input-container"><>
           <label className="input-label" htmlFor="fullname">
             Full Name
           </label>
           <input
             type="text"
             id="fullname"
             className="username-input-field"
             value={fullname}
             onChange={(e)=>setFullName(e.target.value)}
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
             onChange={(e)=>setUsername(e.target.value)}
             placeholder="Enter your Username"
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
             onChange={(e)=>setEmail(e.target.value)}
             placeholder="Enter your Email Address"
           />
         </></div>
         <div className="input-container"><>
           <label className="input-label" htmlFor="email">
             Enter Password for Confirmation
           </label>
           <input
             type="password"
             id="email"
             className="username-input-field"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             placeholder="Enter your Password"
           />
         </></div>
         <button style={{marginBottom:"16px"}} type="submit" className="login-button">
           Update
         </button>
         
         {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
       </form>
                        
                   </div>} 

        </div>
        
    )
}

export default Profile