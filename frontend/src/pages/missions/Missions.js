import React from 'react';
// import { useState, useEffect}  from 'react'
import './Missions.css';

import {MdAddBox} from "react-icons/md";
import MissionCard from "../../components/missionCard/MissionCard";

const Missions = () => {

  // const [missions, setMissions] = useState({})
  
  // // const getMissions = () => {
  // //   fetch('http://localhost:3000/missions')
  // //   .then(res => res.json())
  // //   .then(res => {
  // //     setMissions(res)
  // //   })
  // // }

  // // useEffect(() => {
  // //   getMissions()
  // // },[])

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
          {/* {missions.map.map( (mission) => 
              <MissionCard title={mission.name} description={mission.description} points={mission.points} creator={mission.createdBy} />) 
          } */}
          <MissionCard 
            title={"Pesquisa do LIpE"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={3000} creator={"João da Silva"} 
          />
          <MissionCard 
            title={"Redes de Computadores - GTA"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={1500} creator={"Luiz Henrique"} 
          />
          <MissionCard 
            title={"Pesquisa do PADS"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={1500} creator={"João da Silva"} 
          />
          <MissionCard 
            title={"Pesquisa do LIpE"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={3000} creator={"João da Silva"} 
          />
          <MissionCard 
            title={"Redes de Computadores - GTA"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={1500} creator={"Luiz Henrique"} 
          />
          <MissionCard 
            title={"Pesquisa do PADS"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={1500} creator={"João da Silva"} 
          />
          <MissionCard 
            title={"Pesquisa do LIpE"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={3000} creator={"João da Silva"} 
          />
          <MissionCard 
            title={"Redes de Computadores - GTA"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={1500} creator={"Luiz Henrique"} 
          />
          <MissionCard 
            title={"Pesquisa do PADS"} 
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget dolor massa. Ut at mi fringilla, eleifend turpis ac, hendrerit."} 
            points={1500} creator={"João da Silva"} 
          />
        </div>
        
      </div>
      
    </div>
  );
}

export default Missions;
