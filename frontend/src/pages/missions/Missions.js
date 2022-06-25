import React, { useState, useEffect } from 'react';
import './Missions.css';

import { MdAddBox } from "react-icons/md";
import MissionCard from "../../components/missionCard/MissionCard";

// --- Tela de Missões ---

// Na tela de missões, devemos ter todas as missões disponíveis no banco de dados.

const Missions = () => {

  const [missions, setMissions] = useState([])

  // Pegamos os dados do banco de dados fazendo um fetch pra api:
  const getMissions = () => {
    // O endereço ainda está hardcoded. Isso deve ser mudado.
    fetch('http://localhost:3000/missions')
      .then(res => res.json())
      .then(res => {
        setMissions(res.missions)
      })
  }

  useEffect(() => {
    getMissions()
  }, [])

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
              <MdAddBox className='add-icon' />
              <h3>Criar nova missão</h3>
            </a>
          </div>

        </div>

        <div className='divider'></div>

        <div className='missions-grid'>
          {/* O map abaixo mapeia cada missão no state missions para um MissionCard. */}
          {missions.map((mission, index) =>
            <MissionCard key={index} title={mission.name} description={mission.description} points={mission.points} creator={mission.createdBy} />)
          }
        </div>

      </div>

    </div>
  );
}

export default Missions;
