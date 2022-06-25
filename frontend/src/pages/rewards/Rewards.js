import React from 'react';
import { useState, useEffect } from 'react'
import './Rewards.css';

import Reward from "../../components/reward/Reward";

// --- Tela de Recompensas ---

// Na tela de recompensas, devemos ter todas as recompensas disponíveis no banco de dados.

const Rewards = () => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [rewards, setRewards] = useState([])
  
  const getRewards = () => {
    fetch('http://localhost:3000/rewards')
    .then(res => res.json())
    .then(res => {
      setRewards(res.rewards)
    })
  }

  useEffect(() => {
    getRewards()
  },[])

  // Esse useEffect está setando os pontos atuais do usuário. Isso deve ser mudado para pegar esse dado do banco de dados de acordo com
  // usuário autenticado, quando a autenticação estiver funcionando.
  useEffect(() => {
    setCurrentPoints(4000)
  }, []);

  return (
    <div className="background">
      <div className='content'>
        <div className='mission-page-div'>
          <div>
            <h1 className='page-title'>Recompensas</h1>
            <h3>Use seus pontos e adquira suas recompensas!</h3>
          </div>
          <div>
            <div className="current-points">
              <h3>Seus pontos:</h3>
              <h1 className='points-text'>{currentPoints}</h1>
            </div>
          </div>
          
        </div>

        <div className='divider'></div>
        
        <div className='rewards-grid'>
          {/* O map abaixo deve pegar cada uma das recompensas que é guardada no state missions e criar um componente Reward com seus dados.*/}
          {rewards.map( (reward, index) => 
              <Reward key={index} title={reward.name} description={reward.description} cost={reward.points}/>
            )
          }          
        </div>
        
      </div>
      
    </div>
  );
}

export default Rewards;
