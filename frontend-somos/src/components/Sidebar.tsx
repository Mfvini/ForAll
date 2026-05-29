import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoForAll from '../assets/somos-logo.png'; // Sua logo aqui

export const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Função para verificar se a rota está ativa e mudar a cor do botão
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="sidebar d-flex flex-column p-3 text-white shadow"
            style={{
                width: '250px',
                height: '100vh',
                backgroundColor: '#1E1B4B',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 1000 // Garante que ela fique por cima do fundo
            }}>

            {/* 1. LOGO */}
                    <div className="d-flex align-items-center mb-5 mt-2 ps-2 brand-row">
                        <img src={logoForAll} alt="Logo" className="me-2 sidebar-logo" />
                        <span className="fs-4 fw-bold text-white sidebar-brand">SOMOS</span>
                    </div>

            {/* 2. MENU DE NAVEGAÇÃO */}
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-2">
                    <button
                        className={`nav-link w-100 text-start d-flex align-items-center py-3 px-4 rounded-4 ${isActive('/dashboard') ? 'active bg-primary' : 'text-white'}`}
                        onClick={() => navigate('/dashboard')}
                    >
                        <i className="fa-solid fa-house me-3">Início</i>
                    </button>
                </li>
                <li className="nav-item mb-2">
                    <button className="nav-link w-100 text-start d-flex align-items-center py-3 px-4 text-white rounded-4 opacity-75">
                        <i className="fa-solid fa-heart-pulse me-3">Acolhimento</i>
                    </button>
                </li>
                <li className="nav-item mb-2">
                    <button className="nav-link w-100 text-start d-flex align-items-center py-3 px-4 text-white rounded-4 opacity-75">
                        <i className="fa-solid fa-hand-holding-heart me-3">Doações</i>
                    </button>
                </li>
                <li className="nav-item mb-2">
                    <button className="nav-link w-100 text-start d-flex align-items-center py-3 px-4 text-white rounded-4 opacity-75">
                        <i className="fa-solid fa-user me-3">Perfil</i>
                    </button>
                </li>
            </ul>

            {/* 3. RODAPÉ DA SIDEBAR (BOTÃO SAIR) */}
            <hr className="opacity-25" />
            <div className="pb-3">
                <button
                    className="nav-link w-100 text-start d-flex align-items-center py-3 px-4 text-danger fw-bold rounded-4"
                    onClick={() => {
                        localStorage.clear();
                        navigate('/');
                    }}
                >
                    <i className="fa-solid fa-right-from-bracket me-3">Sair</i>
                </button>
            </div>
        </div>
    );
};