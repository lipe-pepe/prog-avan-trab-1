import React from 'react';

import { MdOutlinePersonOutline } from "react-icons/md";
import Button from "../../components/button/Button"

import Header from "../../components/header/Header"

function Profile() {

  return (
    <div>
      <Header/>
      <div className="App">
      <div className='login-container'>
        <form action="">

          <div className='title'>
            <MdOutlinePersonOutline className='icon'/>
            <h2>Perfil</h2>
          </div>

          <div className='inputDiv'>
            <h5>Nome</h5>
            <input type="text" placeholder='João da Silva'></input>
            <h5>Email</h5>
            <input type="text" placeholder='joao@gmail.com'></input>
            <h5>Senha</h5>
            <input type="password"></input>
          </div>

          <a href="/profile">     
            <Button title="Salvar"></Button>
          </a>
          
        </form> 
      </div>
    </div>
    </div>
    
  );
}

export default Profile;
