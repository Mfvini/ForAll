<?php
require_once 'app/models/UsuarioRepository.php';

class UsuarioController
{
    //1. Endpoint de Cadastro
    public function cadastrar()
    {
        //Captura os dados enviados no corpo da requisição (JSON)
        $json = file_get_contents('php://input');
        $dados = json_decode($json, true);

        //Validação básica
        if (!isset($dados['nome']) || !isset($dados['email']) || !isset($dados['senha']) || !isset($dados['tipo'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Preencha todos os campos obrigatórios.']);
            return;
        }

        //Criptografa a senha usando BCRYPT
        $senhaHash = password_hash($dados['senha'], PASSWORD_BCRYPT);

        $usuarioModel = new UsuarioRepository();

        //Tenta salvar no Banco de Dados
        $sucesso = $usuarioModel->criar([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => $senhaHash,
            'tipo' => $dados['tipo'] //'diretor', 'psicologo', 'paciente'
        ]);

        if ($sucesso) {
            http_response_code(201);
            echo json_encode(['mensagem' => 'Usuário cadastrado com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao cadastrar usuário. O e-mail já pode estar em uso.']);
        }
    }

    //2. EndPoint de Login
    public function login()
    {
        $json = file_get_contents('php://input');
        $dados = json_decode($json, true);

        if (!isset($dados['email']) || !isset($dados['senha'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Email e senha são obrigatórios.']);
            return;
        }

        $usuarioModel = new UsuarioRepository();
        //Busca o usuário pelo email
        $usuario = $usuarioModel->buscarPorEmail($dados['email']);

        //Verifica se o usuário existe e se a senha bate com o Hash do Banco
        if ($usuario && password_verify($dados['senha'], $usuario['senha'])) {
            //Remove a senha do retorno por segurança
            unset($usuario['senha']);

            http_response_code(200);
            echo json_encode([
                'mensagem' => 'Login realizado com sucesso.',
                'usuario' => $usuario //Retorna ID, Nome, Email e tipo para o React saber quem logou
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['erro' => 'E-mail ou senha inválidos.']);
        }
    }

    //3. Endpoint para Obter Perfil
    public function obterPerfil()
    {
        // Corrigido para 'isset' com o 't' no final
        $idUsuario = isset($_GET['id']) ? intval($_GET['id']) : null;

        if (!$idUsuario) {
            http_response_code(400);
            echo json_encode(["erro" => "ID do usuário não fornecido."]);
            return;
        }

        try {
            // Instancia o repositório para buscar no banco db_somos
            $repository = new UsuarioRepository();
            $usuario = $repository->buscarPorId($idUsuario);

            if ($usuario) {
                // Remove a senha por segurança antes de mandar para o React
                unset($usuario['senha']);

                http_response_code(200);
                echo json_encode($usuario);
            } else {
                http_response_code(404);
                echo json_encode(["erro" => "Usuário não encontrado."]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["erro" => "Erro interno no servidor: " . $e->getMessage()]);
        }
    }
}
