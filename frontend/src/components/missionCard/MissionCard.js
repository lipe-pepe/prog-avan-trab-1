import React from 'react';
import './MissionCard.css'

import Button from "../button/Button"

const MissionCard = ({
    title,
    description,
    creator,
    points
}) => {

    return (
        <div className='mission-card'>
            <h2 className='mission-items'>{title}</h2>
            <p className='mission-items'>Criada por {creator}</p>
            <div className='divider'></div>
            <p className='mission-items'>{description}</p> 
            <h5 className='mission-points'>PONTOS: {points} </h5>
            <div className='mission-button'>
                <a href='/mission'>
                    <Button  title="Visitar" fullWidth={false}/>
                </a>
            </div>                  
        </div>
    )
}

export default MissionCard;