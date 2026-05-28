import React, { useEffect, useState } from 'react';
import type { Psicologo } from '../types/psicologo';

export const ListaPsicologos: React.FC = () => {
  const [psicologos, setPsicologos] = useState<Psicologo[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // Consumindo a API PHP que você acabou de ligar!
    fetch('http://localhost/somos/psicologo')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar a lista de psicólogos.');
        }
        return response.json();
      })
      .then((data: Psicologo[]) => {
        setPsicologos(data);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message);
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="alert alert-danger my-4" role="alert">
        {erro}
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary text-center fw-bold">Psicólogos Disponíveis</h2>
      
      {psicologos.length === 0 ? (
        <p className="text-muted text-center">Nenhum psicólogo disponível no momento.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {psicologos.map((psico) => (
            <div className="col" key={psico.id}>
              <div className="card h-100 shadow-sm border-0 border-top border-primary border-4">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">{psico.nome}</h5>
                  <p className="card-text mb-2">
                    <span className="badge bg-secondary">{psico.crp}</span>
                  </p>
                  
                  <p className="card-text text-muted mb-1">
                    <strong>📞 Telefone:</strong> {psico.telefone || 'Não informado'}
                  </p>
                  
                  <p className="card-text text-muted">
                    <strong>🕒 Horários:</strong> {psico.disponibilidade || 'A combinar'}
                  </p>
                </div>
                <div className="card-footer bg-transparent border-0 pt-0 pb-3">
                  <button className="btn btn-outline-primary w-100 fw-bold">
                    Agendar Acolhimento
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};