import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { pontoDoacaoService } from '../services/api';

// 1. Definindo a estrutura do Ponto de Doação para o TypeScript
interface PontoDoacao {
    id: number,
    nome: string,
    endereco: string,
    bairro: string,
    cidade: string,
    telefone: string,
    itens_necessarios:string;
}

export const DashboardPaciente: React.FC = () => {
    const navigate = useNavigate();

    //Estados para controlar os dados, carregamento e possiveis erros
    const [pontos, setPontos] = useState<PontoDoacao[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);

    // 2. Buscando os dados da API assim que a tela carrega
  useEffect(() => {
    const buscarPontos = async () => {
      try {
        setCarregando(true);
        const dados = await pontoDoacaoService.listar();
        setPontos(dados);
      } catch (err: any) {
        setErro('Não foi possível carregar os pontos de doação. Verifique se o XAMPP está ativo.');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    buscarPontos();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      {/* Cabeçalho do Painel */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h1 className="text-primary fw-bold mb-0">Painel do Paciente 🌟</h1>
          <p className="text-muted mb-0">Bem-vindo ao ambiente SOMOS. Aqui você encontra apoio e solidariedade.</p>
        </div>
        <button className="btn btn-outline-danger fw-bold px-4" onClick={() => {
          localStorage.clear();
          navigate('/');
        }}>
          Sair do Sistema
        </button>
      </div>

      {/* Seção dos Pontos de Doação */}
      <div className="mt-5">
        <h3 className="fw-bold text-secondary mb-4">📍 Pontos de Doação Disponíveis</h3>

        {/* Estado de Carregamento */}
        {carregando && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted mt-2">Buscando locais de arrecadação...</p>
          </div>
        )}

        {/* Estado de Erro */}
        {erro && !carregando && (
          <div className="alert alert-danger text-center" role="alert">
            {erro}
          </div>
        )}

        {/* Listagem dos Cards (Apenas se não estiver carregando e não tiver erro) */}
        {!carregando && !erro && (
          <div className="row">
            {pontos.length === 0 ? (
              <div className="col-12 text-center text-muted">
                <p>Nenhum ponto de doação cadastrado no momento.</p>
              </div>
            ) : (
              pontos.map((ponto) => (
                <div className="col-md-6 mb-4" key={ponto.id}>
                  <div className="card h-100 shadow-sm border-start border-4 border-primary">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-primary">{ponto.nome}</h5>
                      <p className="card-text mb-1">
                        <strong>Endereço:</strong> {ponto.endereco} - {ponto.bairro}, {ponto.cidade}
                      </p>
                      {ponto.telefone && (
                        <p className="card-text mb-2">
                          <strong>Telefone:</strong> {ponto.telefone}
                        </p>
                      )}
                      <div className="bg-light p-3 rounded border mt-3">
                        <strong className="text-danger">🎁 Itens Necessários:</strong>
                        <p className="mb-0 text-muted mt-1">{ponto.itens_necessarios}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};