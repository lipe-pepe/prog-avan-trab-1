import React from 'react';
import './Missions.css';

import Header from "../../components/header/Header"
import MissionCard from "../../components/missionCard/MissionCard"

function Missions() {

  return (
    <div className="background">
      <Header/>
      <MissionCard title="Exemplo" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac dui in erat varius porttitor. Integer bibendum dignissim iaculis."/>
    </div>
  );
}

export default Missions;
