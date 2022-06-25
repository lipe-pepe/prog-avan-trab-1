import React from 'react';
import {useState, useEffect} from 'react';
import './Profile.css'

import { MdOutlinePersonOutline } from "react-icons/md";
import Button from "../../components/button/Button"

// --- Tela de Perfil do Usuário ---

// Na tela do perfil, vemos e alteramos os dados do usuário. No entanto, o grupo teve um problema com o CORS 
// e não conseguiu realizar a integração. Os dados estão hardcoded, para efeito de visualização do resultado final.

function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [points, setPoints] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)
  const [completedMissions, setCompletedMissions] = useState([])
  const [claimedRewards, setClaimedRewards] = useState([])

  // Os dados estão hardcoded enquanto o fetch não é implementado.
  useEffect(() => {
    setName('João da Silva')
    setEmail('joao@gmail.com')
    setPoints(4000)
    setTotalPoints(12500)
    setCompletedMissions(['Formulário de Satisfação','Pesquisa do GTA'])
    setClaimedRewards(['IFood - Voucher de R$40,00'])
  },[])
  return (
    <div>
      <div className="App">
      <div className='profile-container'>
        <form action="">

          <div className='title'>
            <MdOutlinePersonOutline className='icon'/>
            <h2>Perfil</h2>
          </div>

          <div className='inputDiv'>
            <div className='flexbox'>
              <div className='column'>
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
              <div className='column'>
                <h5>Missões Finalizadas:</h5>
                { completedMissions.map( (mission) => 
                  <li>{ mission }</li>) 
                }
                <br/>
                <h5>Recompensas ganhadas:</h5>
                { claimedRewards.map( (reward) => 
                  <li>{ reward }</li>) 
                }
              </div>
              
            </div>
            
          </div>
          {/* A funcionalidade de salvar as alterações do usuário ainda deve ser implementada */}
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
