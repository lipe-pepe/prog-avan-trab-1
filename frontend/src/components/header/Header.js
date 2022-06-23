import React from 'react';
import './Header.css'

import {SiBookstack} from "react-icons/si";

import Button from "../button/Button"

const Header = () => {

    return (
        <div className='header'>
            <div className='title'>
                <SiBookstack className='title-icon'/>
                <h1>UniPresente</h1>
            </div>

            <div className='options'>      
                <a className='header-link' href="/missions">
                    <h3>Missões</h3>
                </a>
                <a className='header-link' href="/rewards">
                    <h3>Recompensas</h3>
                </a>
                <a className='header-link' href="/profile">
                    <h3>Meu perfil</h3>
                </a>
            </div>

            <a className="exit" href="/">
                <Button title="Sair"/>
            </a>

        </div>
    )
}

export default Header;