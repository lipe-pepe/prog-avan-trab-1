import React from 'react';
import {useState, useEffect} from 'react';
import './Mission.css'

import Button from "../../components/button/Button"

// --- Tela de Missão ---

// A tela de missão exibe as informações de uma missão específica. A tela ainda não faz o fetch dos dados.

function Mission() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState("")
  const [creator, setCreator] = useState('')
  const [points, setPoints] = useState(0)

  // A tela ainda está hardcoded, ainda não fazemos o fetch. Por enquanto, qualquer tela virá para uma tela com os dados definidos abaixo:
  useEffect(() => {
    setTitle('Redes de Computadores - GTA')
    setDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel vehicula purus. Suspendisse condimentum pulvinar hendrerit. Morbi eget eros augue. Etiam eget hendrerit mi, vel fermentum eros. Sed et risus at lorem consectetur interdum sit amet eget ipsum. Quisque in mattis augue. In finibus mollis sem, ac semper elit ultricies et. Quisque auctor urna at odio fringilla, at sollicitudin tortor vulputate. Vivamus ac pretium dolor, quis ullamcorper nibh. Praesent lacinia scelerisque urna ac maximus. Integer ac bibendum ante. Proin luctus ipsum eu orci imperdiet, a iaculis est faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec mattis diam non nisl mollis commodo. Duis rutrum turpis a nibh sollicitudin pulvinar. Sed a odio dictum, laoreet eros et, finibus augue.')
    setLink('www.google.com')
    setCreator('João da Silva')
    setPoints(3000)
  },[])

  return (
    <div>
      <div className="App">
      <div className='mission-container'>
        <div>
          <h1 className='mission-title'>{title}</h1>
          <h4>Criada por {creator}</h4>
          <div className='divider'></div>
          <p>{description}</p>
          <h5>
            Acesse: <a href={link}>{link}</a>
          </h5>
          <h3>PONTOS: {points}</h3>
          <div className='mission-button'>
            {/* Por enquanto, ainda não é possível se inscrever na missão. O botão de Entrar redireciona para a página de missões */}
            <a href="/missions">     
              <Button title="Entrar na missão" fullWidth={false}></Button>
            </a>
          </div>
        </div>    
      </div>
    </div>
    </div>
    
  );
}

export default Mission;
