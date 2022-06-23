import React from 'react';
import './Header.css'

import { useLocation } from 'react-router-dom';
import {SiBookstack} from "react-icons/si";

import Button from "../button/Button"

const Header = () => {
    const {pathname} = useLocation()

    return (
        <div className='header'>
          <div className='app-title'>
            <SiBookstack className='title-icon'/>
            <h1>UniPresente</h1>
          </div>

          {!(pathname === "/" || pathname === "/register")  && (
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
              <a className="header-link" href="/">
                  <Button title="Sair" fullWidth={true}/>
              </a>
            </div>
            )
          }

        </div>
    )
}

export default Header;