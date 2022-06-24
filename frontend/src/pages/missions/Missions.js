import React, { useState, useEffect } from 'react';
import './Missions.css';

import {MdAddBox} from "react-icons/md";
import MissionCard from "../../components/missionCard/MissionCard";

const Missions = () => {

  const [missions, setMissions] = useState({})
  
  const getMissions = () => {
    fetch('http://localhost:3000/missions')
    .then(res => res.json())
    .then(res => {
      setMissions(res)
    })
  }

  useEffect(() => {
    getMissions()
  },[])

  return (
    <div className="background">
      <div className='content'>
        <div className='mission-page-div'>
          <div>
            <h1 className='page-title'>Missões</h1>
            <h3>Crie e participe de missões para ganhar pontos universitários!</h3>
          </div>
          <div>
            <a className="new-mission-button" href='/missions'>
              <MdAddBox className='add-icon'/>
              <h3>Criar nova missão</h3>
            </a>
          </div>
          
        </div>

        <div className='divider'></div>
        
        <div className='missions-grid'>
          {missions.map.map( (mission) => 
              <MissionCard title={mission.name} description={mission.description} points={mission.points} creator={mission.createdBy} />) 
          }
        </div>
        
      </div>
      
    </div>
  );
}

export default Missions;
