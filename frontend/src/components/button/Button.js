import React from 'react';
import './Button.css';

const Button = ({
  title, 
  color,
  fullWidth
}) => {

  return (
    <div>
      {fullWidth === true &&   
        <button className='full-button'>{title}</button>  
      }
      {fullWidth === false &&   
        <button className='button'>{title}</button>  
      }
    </div>
    
  );
}

export default Button;