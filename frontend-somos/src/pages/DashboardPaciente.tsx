import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardPaciente: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            <div className="card p-5 shadow-sm border-stard border-4 border-primary">
                <h1 className="text-primary fw-bold">Painel do Paciente 🌟</h1>
                <p className="text-muted fs-5">Bem-vindo ao ambiente SOMOS. Aqui você terá acesso suporte psicológico e ao mapa de pontos de doação.</p>
                <hr />
                <button className="btn btn-outline-danger fw-bold" onClick={() => {
                    localStorage.clear(); //Limpa a sessão ao sair
                    navigate ('/'); 
                }}>Sair do Sistema</button>
            </div>
        </div>
    );
};