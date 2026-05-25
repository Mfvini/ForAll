import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importa o hook de navegação
import { usuarioService } from '../services/api';

export const Login: React.FC = () => {
    // Instancia o navegador de rotas
    const navigate = useNavigate();

    // Estados do Formulário
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Estados para controle de feedback visual
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);
    const [sucesso, setSucesso] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Evita o recarregamento da página
        setCarregando(true);
        setErro(null);
        setSucesso(null);

        try {
            // Dispara a requisição para o nosso back-end PHP no XAMPP
            const resposta = await usuarioService.login({ email, senha });

            // Se o login der certo, exibe a mensagem de boas-vindas
            setSucesso(`${resposta.mensagem} Bem-vindo, ${resposta.usuario.nome}!`);

            // 2. Inteligência de Redirecionamento Baseado no Perfil/Tipo
            const tipoUsuario = resposta.usuario.tipo;

            // Aguarda 1.5 segundos exibindo o alerta verde de sucesso antes de mudar de página
            setTimeout(() => {
                if (tipoUsuario === 'paciente') {
                    navigate('/dashboard/paciente');
                } else if (tipoUsuario === 'psicologo') {
                    navigate('/dashboard/psicologo');
                } else if (tipoUsuario === 'diretor') {
                    navigate('/dashboard/diretor');
                } else {
                    // Caso venha algum tipo não mapeado, joga para uma rota padrão segura
                    navigate('/dashboard');
                }
            }, 1500);

        } catch (error: any) {
            // Captura erros estruturados da nossa API ou falhas de rede
            if (error.response && error.response.data && error.response.data.erro) {
                setErro(error.response.data.erro);
            } else if (error.message) {
                // Trata a mensagem personalizada que adicionamos no catch do api.ts
                setErro(error.message);
            } else {
                setErro('Não foi possível conectar ao servidor. Verifique o XAMPP.');
            }
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: '10px' }}>
                <div className="card-body">
                    {/* Título do Projeto */}
                    <h2 className="text-center fw-bold text-primary mb-2">SOMOS</h2>
                    <p className="text-center text-muted mb-4">Apoio Psicológico e Solidariedade</p>

                    {/* Exibição de Alertas do Bootstrap */}
                    {erro && <div className="alert alert-danger py-2 text-center" role="alert">{erro}</div>}
                    {sucesso && <div className="alert alert-success py-2 text-center" role="alert">{sucesso}</div>}

                    {/* Formulário de Login */}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="nome@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
                            <input
                                type="password"
                                id="senha"
                                className="form-control"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 fw-bold py-2"
                            disabled={carregando}
                        >
                            {carregando ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : 'Entrar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};