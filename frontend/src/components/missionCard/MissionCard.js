import React from 'react';
import './MissionCard.css'

import Button from "../button/Button"

const MissionCard = ({
    title,
    description
}) => {

    return (
        <div className='mission-card'>
            <h2 className='mission-items'>{title}</h2>
            <p className='mission-items'>{description}</p>         
            <Button className='mission-items' title="Entrar"/>
        </div>
    )
}

export default MissionCard;