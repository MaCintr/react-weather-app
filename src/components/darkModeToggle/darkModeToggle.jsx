import React, { useState, useEffect } from 'react';
import './darkModeToggle.css';

function DarkModeToggle() {
    const [statusTema, setStatusTema] = useState(verificarTema());

    function alterarTema() {
        const htmlTag = document.documentElement;
        const currentTheme = htmlTag.getAttribute('data-bs-theme');

        if (currentTheme === 'dark') {
            htmlTag.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            console.log('Tema claro');
            setStatusTema(false);
        } else {
            htmlTag.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            console.log('Tema escuro');
            setStatusTema(true);
        }
    }

    function verificarTema() {
        if (localStorage.getItem('theme') === 'dark') {
            return true;
        }
        return false;
    }

    useEffect(() => {
        // Verifica o tema ao montar o componente
        if (verificarTema()) {
            setStatusTema(true);
        }
    }, []);

    return (
        <div className='d-flex'>
        <label className="switch me-2">
            <input
                type="checkbox"
                onChange={alterarTema}
                checked={statusTema} // Define o estado do checkbox com base no tema
                />
            <span className="slider"></span>
        </label>
        </div>
    );
}

export default DarkModeToggle;
