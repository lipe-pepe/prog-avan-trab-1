import React from 'react';
import './Button.css';

const Button = ({
  title, 
  // A prop full width será uma booleana indicando se o botão deve ter o design full ou limitado ao seu texto.
  fullWidth,
  ref
}) => {

  return (
    <div>
      {fullWidth === true &&   
        <a className='full-button' href={ref}>{title}</a>  
      }
      {fullWidth === false &&   
        <button className='button' href={ref}>{title}</button>  
      }
    </div>
    
  );
}

export default Button;