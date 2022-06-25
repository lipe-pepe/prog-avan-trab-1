import React from 'react';
import './Layout'

import Header from "./header/Header"

// O Layout principal da aplicação é usado no componente Routes, para estar em todas as páginas.

const Layout = () => {
    return (
        <div className='layout'>
            <Header/>
        </div>

    )
}

export default Layout