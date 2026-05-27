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

// 1. Serviço de Usuário (Login que já estava funcionando)
export const usuarioService = {
    login: async(dados:any) => {
        // Ajuste o endpoint se no seu roteador dinâmico for diferente (ex: '/usuario/login')
        const resposta = await api.post('/usuario/login', dados);
        return resposta.data;
    },
    cadastro: async (dados:any) => {
        const resposta =  await api.post('/usuario/cadastro', dados);
        return resposta.data;
    }
};

// NOVO SERVIÇO: PONTOS DE DOAÇÂO (Sprint 4)
export const pontoDoacaoService = {
    listar: async () => {
        // Chama o endpoint exato que testamos com sucesso no navegador!
        // Graças ao seu roteador dinâmico, isso vai invocar o PontoDoacaoController
        const resposta = await api.get('/pontoDoacao');
        return resposta.data;
    }
};