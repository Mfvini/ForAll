import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { DashboardPaciente } from './pages/DashboardPaciente';
import { DashboardPsicologo } from './pages/DashboardPsicologo';
import { DashboardDiretor } from './pages/DashboardDiretor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rota Inicial: Tela de Login */}
        <Route path="/" element={<Login />} />

        {/* Rotas Internas Oficiais */}
        <Route path="/dashboard/paciente" element={<DashboardPaciente />} />
        <Route path="/dashboard/psicologo" element={<DashboardPsicologo />} />
        <Route path="/dashboard/diretor" element={<DashboardDiretor />} />

        {/* Rota de segurança para caminhos existentes */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};