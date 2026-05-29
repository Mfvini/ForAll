import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-white pt-4 pb-4 mt-5 border-topo border-primary border-3">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-7 text-center text-md-start mb-3 mb-md-0">
                        <h5 className="fw-bold text-primary text-uppercase">Projeto SOMOS</h5>
                        <p className="text-secondary small mb-0">Uma plataforma dedicada oferecer suporte psicológico gratuito para quem mais precisa e a mapear doações Feito por estudantes da ETEC - 2026.</p>
                    </div>

                    <div className="col-md-5 text-center text-md-end">
                        <p className="text-secondary small mb-0">&copy; {new Date().getFullYear()} <strong>SOMOS</strong></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};