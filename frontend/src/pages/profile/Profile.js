import React from 'react';
import {useState, useEffect} from 'react';

import { MdOutlinePersonOutline } from "react-icons/md";
import Button from "../../components/button/Button"

function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [points, setPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    setName('João da Silva')
    setEmail('joao@gmail.com')
    setPoints(4000)
    setTotalPoints(12500)
  },[])
  return (
    <div>
      <div className="App">
      <div className='login-container'>
        <form action="">

          <div className='title'>
            <MdOutlinePersonOutline className='icon'/>
            <h2>Perfil</h2>
          </div>

          <div className='inputDiv'>
            <h5>Nome</h5>
            <input type="text" placeholder={name}></input>
            <h5>Email</h5>
            <input type="text" placeholder={email}></input>
            <h5>Senha</h5>
            <input type="password"></input>
            <p>Pontos atuais:</p>
            <h5>{points}</h5>
            <p>Pontos totais:</p>
            <h5>{totalPoints}</h5>
          </div>

          <a href="/profile">     
            <Button title="Salvar" fullWidth={true}></Button>
          </a>
          
        </form> 
      </div>
    </div>
    </div>
    
  );
}

export default Profile;
