import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Missions from './pages/missions/Missions'
import Profile from './pages/profile/Profile'

export default function ApplicationRoutes() {
    return (
        <BrowserRouter>   
          <Routes>     
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/missions" element={<Missions/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
          </Routes>      
        </BrowserRouter>
    )
}

