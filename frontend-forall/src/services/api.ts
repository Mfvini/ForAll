import axios from 'axios';

//Define a URL base do back-end no Xampp
//IMPORTANTE: Altere 'ForALL' para o nome exato da pasta do seu projeto se for diferente!
const API_BASE_URL = 'http://localhost/ForAll';
//axios.creat: Cria uma instância pré-configurada do Axios. Toda vez que usarmos o objeto "api", ele já sabe que deve bater em "http://localhost/ForAll" e que vai enviar os dados em formato de JSON.
export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//Interface para estruturar os dados que o front-end vai enviar no Login
export interface LoginData {
    email: string;
    senha: string;
}

//Interface para estruturar os dados que o front-end vai enviar no Cadastro
export interface CadastroData {
    nome: string;
    email: string;
    senha: string;
    tipo: 'paciente' | 'psicologo' | 'diretor';
}

//Objeto que agrupa os nossos serviços de autenticação e usuário
export const usuarioService = {
    //Função para realizar o Login
    login: async (dados: LoginData) => {
        const resposta = await api.post('/usuario/login', dados);
        return resposta.data;
    },

    //Função para realizar o Cadastro
    cadastrar: async (dados: CadastroData) => {
        const resposta = await api.post('/usuario/cadastrar', dados);
        return resposta.data;
    }
};