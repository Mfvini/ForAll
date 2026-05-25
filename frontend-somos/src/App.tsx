import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './pages/Login';

// Tela Interna do Paciente (Onde vai ficar o mapa de doações e suporte)
const DashboardPaciente = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="card p-5 shadow-sm border-start border-4 border-primary">
        <h1 className="text-primary fw-bold">Painel do Paciente 🌟</h1>
        <p className="text-muted fs-5">Bem-vindo ao ambiente "S.O.M.O.S". Aqui você terá acesso ao suporte psicológico e ao mapa de pontos de doação.</p>
        <hr />
        <button className="btn btn-outline-danger fw-bold" onClick={() => navigate('/')}>Sair do Sistema</button>
      </div>
    </div>
  );
};

// Tela Interna do Psicólogo
const DashboardPsicologo = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="card p-5 shadow-sm border-start border-4 border-success">
        <h1 className="text-success fw-bold">Painel do Psicólogo 🧠</h1>
        <p className="text-muted fs-5">Bem-vindo profissional! Aqui você poderá gerenciar suas consultas e apoiar a comunidade.</p>
        <hr />
        <button className="btn btn-outline-danger fw-bold" onClick={() => navigate('/')}>Sair do Sistema</button>
      </div>
    </div>
  );
};

// Tela Interna do Diretor
const DashboardDiretor = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      <div className="card p-5 shadow-sm border-start border-4 border-warning">
        <h1 className="text-warning fw-bold">Painel do Diretor 🛡️</h1>
        <p className="text-muted fs-5">Área administrativa. Gerenciamento geral do sistema SOMOS.</p>
        <hr />
        <button className="btn btn-outline-danger fw-bold" onClick={() => navigate('/')}>Sair do Sistema</button>
      </div>
    </div>
  );
};

// ==========================================
// 🗺️ MAPEAMENTO DE ROTAS PRINCIPAL
// ==========================================
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Inicial: Tela de Login */}
        <Route path="/" element={<Login />} />

        {/* Rotas Internas que o Login vai chamar baseado no tipo do usuário */}
        <Route path="/dashboard/paciente" element={<DashboardPaciente />} />
        <Route path="/dashboard/psicologo" element={<DashboardPsicologo />} />
        <Route path="/dashboard/diretor" element={<DashboardDiretor />} />

        {/* Rota de segurança caso digitem algo inexistente */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;