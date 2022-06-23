import React from 'react';
import './Register.css';

import Button from "../../components/button/Button"

function Register() {

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Você clicou em entrar.');
  }

  return (
    <div className="App">
      <div className='login-container'>
        <form action="" onSubmit={handleSubmit}>

          <div className='title'>
            <h2>Cadastro</h2>
          </div>    

          <div className='inputDiv'>
            <h5>Nome</h5>
            <input type="text"></input>
            <h5>Email</h5>
            <input type="text"></input>
            <h5>Senha</h5>
            <input type="password"></input>
          </div>

          <a href="/">        
            <Button title="Cadastrar"></Button>
          </a>
          
          <div className='centered'>    
            <a href="/">Voltar</a>
          </div>

        </form> 
      </div>
    </div>
  );
}

export default Register;
