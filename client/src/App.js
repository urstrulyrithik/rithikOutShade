import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { LoginForm } from './Components/LoginForm'
import Signup from './Components/Signup'
import ProtectedRoute from './Components/ProtectedRoute'
import Profile from './Components/Profile'
import Categories from './Components/Categories'
import Products from './Components/Products'
import { Header } from './Components/Header'
import { AuthProvider } from './Components/Auth'
import Home from './Components/Home'

import './App.css'

function App() {
  return(
    
    <AuthProvider>
     
<Router>
<Header/>
<Routes>
  <Route element={<ProtectedRoute/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/categories' element={<Categories/>}/>
  </Route>
  <Route path='/' element={<Home/>}/>
  <Route  path='/login' element={<LoginForm/>} />
  <Route  path='/signup' exact element={<Signup/>} />
  {/* <Redirect to="/" /> */}
</Routes>
</Router>
    </AuthProvider>

  )

}

export default App
