require_once 'app/database/UsuarioRepository.php';

class UsuarioController {
    //1. Endpoint de Cadastro (POST/usuarios ou tratado por sua rota)
    public function cadastrar() {
        //Captura os dados enviados no corpo da requisição (JSON)
        $json = file_get_contents('php://input');
        $dados = json_decode($json,true);

        //Validação basica
        if(!isset($dados['nome']) || !isset($dados['email']) || !isset($dados['senha']) || !isset($dados['classificação'])){
            http_response_code(400);
            echo json_encode(['erro => 'Preencha todos os campos obrigatórios.']);
        }
        //Criptografa a senha usando BCRYPT (Segurança da Etapa 3)
        $senhaHash = password_hash($dados['senha'], PASSWORD_ BCRYPT);

        $usuarioModel = new UsuarioRepository();

        //Tenta salvar no Banco de Dados
        $sucesso = $usuarioModel->criar([
            'nome' => $dados['nome'],
            'email' => $dados['email'],
            'senha' => $dados['senha'],
            'classificação' => $dados['classificação']//'diretor', 'psicologo', 'paciente'
        ]);

        if($sucesso) {
            http_response_code(201);
            echo json_encode(['mensagem' => 'Usuário cadastrado com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['erro' => 'Erro ao cadastrar usuário. O e-mail já pode estar em uso.']);
        }

    }

    //2. EndPoint de Login (POST/login)
    public function login() {
        $json = file_get_contents('php://input');
        $dados = json_decode($json, true);

        if(!isset($dados['email']) || !isset($dados['senha'])) {
            http_response_code(400);
            echo json_encode(['erro' => 'Email e senha são obrigatórios.']);
            return;
        }

        $usuarioModel = new Usuario();
        //Busca o usuário pelo emaol
        $usuario = $usuarioModel->buscarPorEmail($dados['email']);

        //Verifica se o usuário existe e se a senha bate com o Hash do Banco
        if($usuario && password_verify($dados['senha'], $usuario['senha'])) {
            //Remove a senha do retorno por segurança
            unset($usuario['senha']);

            http_response_code(200);
            echo json_encode([
                'mensagem' => 'Login realizado com sucesso.',
                'usuario' => $usuario //Retorna ID, Nome, Email e Classificação para o React saber quem logou
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['erro' => 'E-mail ou senha inválidos.']);
        }
    }
}