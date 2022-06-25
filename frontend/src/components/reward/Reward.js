import React from 'react';
import './Reward.css'

import noImage from "../../no-image.jpg"
import Button from "../button/Button"

const Reward = ({
  title,
  description,
  cost,
}
) => {

    return (
        <div className='background'>
            <div className='reward'>
              {/* A imagem deve ser substituída pela imagem da recompensa quando o fetch estiver implementado. */}
              <img className="reward-image" src={noImage} alt="Not found" />
              <div>
                  <h2>{title}</h2>
                  <p>{description}</p>
              </div>
              <div className='cost-area'>
                <h3>Custo: {cost}</h3>
                {/* A funcionalidade de comprar ainda não está desenvolvida no front-end */}
                <h4><Button title="Comprar" fullWidth={false}/></h4>
              </div>
            </div>
            
        </div>
    )
}

export default Reward