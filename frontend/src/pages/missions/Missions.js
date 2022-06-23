import React from 'react';
import './Missions.css';

import {MdAddBox} from "react-icons/md";
import MissionCard from "../../components/missionCard/MissionCard";

const Missions = () => {

  return (
    <div className="background">
      <div className='content'>
        <div className='mission-page-div'>
          <div>
            <h1 className='page-title'>Missões</h1>
            <h3>Crie e participe de missões para ganhar pontos universitários!</h3>
          </div>
          <div>
            <a className="new-mission-button" href='/new_mission'>
              <MdAddBox className='add-icon'/>
              <h3>Criar nova missão</h3>
            </a>
          </div>
          
        </div>

        <div className='divider'></div>
        
        <div className='missions-grid'>
          <MissionCard 
            title="Exemplo" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />
          <MissionCard 
            title="Redes de Computadores - GTA" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="Luiz Henrique"
            points={1500}
          />
          <MissionCard 
            title="Pesquisa de Mercado para projeto de App de Transporte" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />

          <MissionCard 
            title="Pesquisa de Mercado para projeto de App de Transporte" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />

          <MissionCard 
            title="Exemplo" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />
          <MissionCard 
            title="Redes de Computadores - GTA" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="Luiz Henrique"
            points={1500}
          />
          <MissionCard 
            title="Pesquisa de Mercado para projeto de App de Transporte" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />

          <MissionCard 
            title="Pesquisa de Mercado para projeto de App de Transporte" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />

          <MissionCard 
            title="Pesquisa de Mercado para projeto de App de Transporte" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."
            creator="João"
            points={1500}
          />
        </div>
        
      </div>
      
    </div>
  );
}

export default Missions;
