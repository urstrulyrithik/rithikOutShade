import {NavLink} from 'react-router-dom'
import { useAuth } from '../Auth'
import './index.css'

export const Header=()=>{

    const auth=useAuth()

    return(
        <nav>
            <NavLink to='/'>Home</NavLink>
{ !auth.user && (<NavLink to='/login'>Login</NavLink>)
            
}
            <NavLink to='/signup'>Sign Up</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/products'>Products</NavLink>
            <NavLink to='/categories'>Categories</NavLink>
        </nav>
    )
}