import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardDiretor: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            <div className="card p-5 shadow-sm border-stard border-4 border-warning">
                <h1 className="text-warning fw-bold">Painel do Diretor 🛡️</h1>
                <p className="text-muted fs-5">Área administrativa. Gerenciamento geral do sistema SOMOS. </p>
                <hr />
                <button className="btn btn-outline-danger fw-bold" onClick={() => {
                    localStorage.clear(); //Limpa a sessão ao sair
                    navigate ('/'); 
                }}>Sair do Sistema</button>
            </div>
        </div>
    );
};