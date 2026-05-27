<?php

class PontoDoacao {
    private $conexao;
    private $tabela = "pontos_doacao";

    public function __construct($db) {
        $this->conexao = $db;
    }

    //Método para listas todos os pontos de Doação
    public function ListarTodos() {
        //Query simples e direta (SARGable por natureza por não usar função nos campos)
        $query = "SELECT id, nome, endereco, bairro, cidade, telefone, itens_necessarios, criado_em
                  FROM " . $this->tabela . "
                  ORDER BY criado_em DESC";
        
        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}

?>