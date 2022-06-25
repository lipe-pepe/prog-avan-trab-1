import React from 'react';
import './Register.css';

import Button from "../../components/button/Button"


// --- Tela de Cadastro ---

// A autenticação ainda NÃO foi implementada no projeto. Dito isso, a tela de cadastro por enquanto é somente
// uma simulação de como será o design e usabilidade posteriormente. No momento ela somente redireciona
// o usuário para a tela de login ao enviar o formulário.

function Register() {

  // A função abaixo serve como teste do formulário de cadastro, enquanto a autenticação não é implementada.
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
            <Button title="Cadastrar" fullWidth={true}></Button>
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
