import React from 'react';
import './App.css';
import { MdLogin } from "react-icons/md";
import Button from "./components/button/Button"

function App() {

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Você clicou em entrar.');
  }

  return (
    <div className="App">
      <div className='container'>
        <form action="" onSubmit={handleSubmit}>
          <div className='title'>
            <MdLogin className='icon'></MdLogin>
            <h2>Login</h2>
          </div>      
          <div className='inputDiv'>
            <h5>Login</h5>
            <input type="text"></input>
          </div>
          <div className='inputDiv'>
            <h5>Senha</h5>
            <input type="text"></input>
          </div>
          <Button title="Entrar"></Button>
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

export default App;
