<?php
require_once 'app/database/Conexao.php';

class UsuarioRepository
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Conexao::getConexao();
    }
    //Busca no banco (usado no Login)
    public function buscarPorEmail(string $email)
    {
        try {
            $query = "SELECT id, nome, senha, tipo FROM usuarios WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':email', $email);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
    //Insere no banco (Usado no Cadastrado)
    public function criar(array $dados)
    {
        try {
            $query = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (:nome, :email, :senha, :tipo)";
            $stmt = $this->db->prepare($query);

            $stmt->bindValue(':nome', $dados['nome']);
            $stmt->bindValue(':email', $dados['email']);
            $stmt->bindValue(':senha', $dados['senha']);
            $stmt->bindValue(':tipo', $dados['tipo']);

            return $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }
    }

    public function buscarPorId($id)
    {
        // Pega a conexão PDO que você já configurou no projeto
        $conexao = Conexao::getConexao();

        // Faz o SELECT buscando exatamente pelo ID primário da tabela
        // OBS: Se a sua tabela no banco se chamar 'usuario' no singular, mude de 'usuarios' para 'usuario'
        $sql = "SELECT id, nome, email, tipo FROM usuarios WHERE id = :id";

        $stmt = $conexao->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        // Retorna os dados do usuário encontrado em formato de array associativo
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

?>
