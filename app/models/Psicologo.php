<?php
class Psicologo {
    private $conn;
    private $table_name = "psicologos";

    //Recebe conexão com o banco de dados que vem do Controller
    public function __construct($db) {
        $this->conn = $db;
    }

    //Método para buscar os psicológos cadastrados
    public function listarTodos() {
        $query = "SELECT id, nome, crp, telefone, disponibilidade FROM " . $this->table_name . " ORDER BY nome ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>
