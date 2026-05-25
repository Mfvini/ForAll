import axios from 'axios';

// Define a URL base do back-end no Xampp
const API_BASE_URL = 'http://localhost/Somos';

// Cria uma instância pré-configurada do Axios
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interface para estruturar os dados que o front-end vai enviar no Login
export interface LoginData {
    email: string;
    senha: string;
}

// Interface para estruturar os dados que o front-end vai enviar no Cadastro
export interface CadastroData {
    nome: string;
    email: string;
    senha: string;
    tipo: 'paciente' | 'psicologo' | 'diretor';
}

// Objeto que agrupa os nossos serviços de autenticação e usuário
export const usuarioService = {
    // Função para realizar o Login com try/catch para enviar o erro correto ao Login.tsx
    login: async (dados: LoginData) => {
        try {
            const resposta = await api.post('/usuario/login', dados);
            return resposta.data;
        } catch (erro: any) {
            // Se o PHP respondeu com o erro estruturado (ex: 401 ou 400)
            if (erro.response && erro.response.data) {
                throw new Error(erro.response.data.erro || 'Erro ao realizar login.');
            }
            throw new Error('Não foi possível conectar ao servidor. Verifique o XAMPP.');
        }
    },

    // Função para realizar o Cadastro
    cadastrar: async (dados: CadastroData) => {
        try {
            const resposta = await api.post('/usuario/cadastrar', dados);
            return resposta.data;
        } catch (erro: any) {
            if (erro.response && erro.response.data) {
                throw new Error(erro.response.data.erro || 'Erro ao realizar cadastro.');
            }
            throw new Error('Não foi possível conectar ao servidor. Verifique o XAMPP.');
        }
    }
};