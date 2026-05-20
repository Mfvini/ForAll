require_once 'app/database/Conexao.php';

class UsuarioRepository {
    private $db;

    public function __contruct() {
        $this->db = Conexao::getConexao();
    }
    //Busca no banco (usado no Login)
    public function buscarPorEmail(string $email) {
        try {
            $query = "SELECT id, nome, senha, classificacao FROM usuarios WHERE email = :email";
            $stmt = $this->db->prepare($query);
            $stmt->bindValue(':email', $email);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return false;
        }
    }
    //Insere no banco (Usado no Cadastrado)
    public function criar(array $dados) {
        try {
            $query = "INSERT INTO usuarios (nome, email, senha, classificacao) VALUES (:nome, :email, :senha, :classificacao)";
            $stmt = $this->db->prepare($query);
            
            $stmt->bindValue(':nome', $dados['nome']);
            $stmt->bindValue(':email', $dados['email']);
            $stmt->bindValue(':senha', $dados['senha']);
            $stmt->bindValue(':classificacao', $dados['classificação']);

            return $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }
    }
}