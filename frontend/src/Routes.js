import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Layout from './components/Layout'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Missions from './pages/missions/Missions'
import Profile from './pages/profile/Profile'
import Rewards from './pages/rewards/Rewards'
import Mission from './pages/mission/Mission'

export default function ApplicationRoutes() {
    return (
        <BrowserRouter>
          <Layout/> 
            <Routes>     
              <Route exact path="/" element={<Login/>} />
              <Route exact path="/register" element={<Register/>}/>
              <Route exact path="/missions" element={<Missions/>}/>
              <Route exact path="/profile" element={<Profile/>}/>
              <Route exact path="/rewards" element={<Rewards/>}/>
              <Route path="/mission" element={<Mission/>}/>
            </Routes> 
        </BrowserRouter>
    )
}

