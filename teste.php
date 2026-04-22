<?php
require_once 'database/Conexao.php';

try {
    $conn = Conexao::getConexao();
    echo "<h1>Conexão com o banco db_forall realizada com sucesso!</h1>";
    //Teste verificando se as tabelas existem
    $query = $conn->query("SHOW TABLES");
    echo "<h3>Tabelas encontradas:</h3><ul>";
    while($row = $query->fetch(PDO::FETCH_ASSOC)){
        echo "<li>" . array_values($row)[0] . "</li>";
    }
    echo "</ul>";
} catch (Exception $e) {
    echo "<h1>Erro ao conectar:</h1>" . $e->getMessage();
}

?>