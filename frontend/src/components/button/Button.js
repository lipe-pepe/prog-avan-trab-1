import React from 'react';
import './Button.css'

const Button = ({title, color}) => {

  return (
    <button className='button'>{title}</button>  
  )
}

export default Button