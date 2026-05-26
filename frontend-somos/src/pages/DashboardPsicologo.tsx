import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DashboardPsicologo: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="container mt-5">
            <div className="card p-5 shadow-sm border-stard border-4 border-success">
                <h1 className="text-success fw-bold">Painel do Psicólogo 🧠</h1>
                <p className="text-muted fs-5">Bem-vindo Profissional. Aqui você poderá gerenciar suas consultas e apoiar a comunidade.</p>
                <hr />
                <button className="btn btn-outline-danger fw-bold" onClick={() => {
                    localStorage.clear(); //Limpa a sessão ao sair
                    navigate ('/'); 
                }}>Sair do Sistema</button>
            </div>
        </div>
    );
};