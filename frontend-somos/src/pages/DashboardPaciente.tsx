import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { pontoDoacaoService } from '../services/api';
import { ListaPsicologos } from '../components/ListaPsicologos';
import { Sidebar } from '../components/Sidebar';
import { Footer } from '../components/Footer';

// 1. Definindo a estrutura do Ponto de Doação para o TypeScript
interface PontoDoacao {
  id: number,
  nome: string,
  endereco: string,
  bairro: string,
  cidade: string,
  telefone: string,
  itens_necessarios: string;
}

export const DashboardPaciente: React.FC = () => {
  // const navigate = useNavigate();

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
    <div className="d-flex min-vh-100 bg-light m-0 p-0" style={{ overflowX: 'hidden', width: '100%'}}>
      {/* 1. TOPO: Identidade e Menu */}
      <Sidebar />

      {/* Container Principal: Segura todo o conteúdo centralizado e empurrado pelas margens */}
      <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: '245px', minWidth: 0 }}>

        {/* Espaçamento interno controlado (p-4 para telas menores, p-5 para telas cheias) */}
        <main className="px-4 py-4 w-100 flex-grow-1">

          {/* Cabeçalho superior dinâmico */}
          <header className="mb-4 w-100">
            <div className="alert alert-primary rounded-4 py-4 px-4 w-100 shadow-sm border-0 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#E0E7FF', color: '#4338ca' }}>
              <div>
                <h4 className="mb-1 fw-bold">Bem-vindo de volta! 👋</h4>
                <p className="mb-0 opacity-75">Que bom ver você no ambiente SOMOS hoje. Aqui você encontra apoio e solidariedade.</p>
              </div>
              <div className="bg-white rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                <i className="fa-solid fa-user text-primary fs-4"></i>
              </div>
            </div>
          </header>

          {/* Seção 1: Pontos de Doação Disponíveis */}
          <section className="mb-4 w-100">
            <h3 className="fw-bold text-secondary mb-4">📍 Pontos de Doação Disponíveis</h3>

            {carregando && (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2">Buscando locais de arrecadação...</p>
              </div>
            )}

            {erro && !carregando && (
              <div className="alert alert-danger text-center" role="alert">
                {erro}
              </div>
            )}

            {!carregando && !erro && (
              <div className="row">
                {pontos.length === 0 ? (
                  <div className="col-12 text-center text-muted">
                    <p>Nenhum ponto de doação cadastrado no momento.</p>
                  </div>
                ) : (
                  pontos.map((ponto) => (
                    <div className="col-lg-6 col-md-12 mb-4" key={ponto.id}>
                      <div className="card h-100 shadow-sm border-0 rounded-4 border-start border-4 border-primary">
                        <div className="card-body p-4">
                          <h5 className="card-title fw-bold text-primary mb-3">{ponto.nome}</h5>
                          <p className="card-text mb-2 text-muted">
                            <i className="fa-solid fa-location-dot me-2 text-secondary"></i>
                            <strong>Endereço:</strong> {ponto.endereco} - {ponto.bairro}, {ponto.cidade}
                          </p>
                          {ponto.telefone && (
                            <p className="card-text mb-3 text-muted">
                              <i className="fa-solid fa-phone me-2 text-secondary"></i>
                              <strong>Telefone:</strong> {ponto.telefone}
                            </p>
                          )}
                          <div className="p-3 rounded-4 border-0 mt-3" style={{ backgroundColor: '#FFF5F5' }}>
                            <strong className="text-danger">
                              <i className="fa-solid fa-box-open-heart me-2"></i>Itens Necessários:
                            </strong>
                            <p className="mb-0 text-dark opacity-75 mt-1 small">{ponto.itens_necessarios}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>

          <hr className="my-4 text-muted opacity-25" />

          {/* Seção 2: Psicólogos Disponíveis */}
          <section className="mb-4 w-100">
            <div className="d-flex mb-4">
              <h3 className="fw-bold text-secondary mb-0">👥 Psicólogos Disponíveis</h3>
            </div>
            {/* Tag container corrigida e Lista isolada no escopo certo */}
            <div className="container-fluid">
              <ListaPsicologos />
            </div>
          </section>
        </main>

        {/* 3. RODAPÉ INSTITUCIONAL */}
        <div className="w-100" style={{ minWidth: 0 }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};