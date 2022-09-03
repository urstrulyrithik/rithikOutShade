import {Outlet, Navigate} from 'react-router-dom'
import Cookie from 'js-cookie'


const ProtectedRoute=()=>{
    const token = Cookie.get('jwt_token')

    return(
        token ? <Outlet/> : <Navigate to="/login"/>
    )

}

export default ProtectedRoute