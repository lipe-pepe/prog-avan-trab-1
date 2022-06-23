import React from 'react';
import './Login.css';

import { MdLogin } from "react-icons/md";
import Button from "../../components/button/Button"

function Login() {

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Você clicou em entrar.');
  }

  return (
    <div className="App">
      <div className='login-container'>
        <form action="" onSubmit={handleSubmit}>

          <div className='title'>
            <MdLogin className='icon'/>
            <h2>Login</h2>
          </div>

          <div className='inputDiv'>
            <h5>Login</h5>
            <input type="text"></input>
            <h5>Senha</h5>
            <input type="password"></input>
          </div>

          <a href="/missions">     
            <Button title="Entrar" fullWidth={true}></Button>
          </a>

          <div>
            <p>Não está cadastrado? 
              <a href="register">Cadastre-se agora</a>
            </p>
          </div>
          
        </form> 
      </div>
    </div>
  );
}

export default Login;
