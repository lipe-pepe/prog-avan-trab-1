import React from 'react';
import { useState, useEffect } from 'react'
import './Rewards.css';

import Reward from "../../components/reward/Reward";

const Rewards = () => {
  const [currentPoints, setCurrentPoints] = useState(0);

  // MUDAR ISSO DEPOIS
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
          <Reward 
            title="Voucher de 50 reais no IFood" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat magna quis magna varius, efficitur lobortis purus molestie. Curabitur efficitur."
            cost={4500}
          />
          <Reward 
            title="Minicurso de Python" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat magna quis magna varius, efficitur lobortis purus molestie. Curabitur efficitur."
            cost={5000}
          />
          <Reward 
            title="Curso exclusivo de JavaScript" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat magna quis magna varius, efficitur lobortis purus molestie. Curabitur efficitur."
            cost={3000}
          />
          <Reward 
            title="Vale 10 reais no quiosque 'Bom Gosto'" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat magna quis magna varius, efficitur lobortis purus molestie. Curabitur efficitur."
            cost={4000}
          />
          
        </div>
        
      </div>
      
    </div>
  );
}

export default Rewards;
