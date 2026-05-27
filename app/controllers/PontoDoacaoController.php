<?php
require_once __DIR__ . '/../models/PontoDoacao.php';

class PontoDoacaoController
{
    private $db;
    private $pontoDoacao;

    public function __construct($db)
    {
        $this->db = $db;
        $this->pontoDoacao = new PontoDoacao($db);
    }

    //Processa a listagem e envia o JSON
    public  function listar()
    {
        // Define o cabeçalho para JSON
        header("Content-Type: application/json; charset=UTF-8");

        try {
            $stmt = $this->pontoDoacao->ListarTodos();
            $num = $stmt->rowCount();

            if ($num > 0) {
                $pontos_arr = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $ponto_item = array(
                        "id" => $id,
                        "nome" => $nome,
                        "endereco" => $endereco,
                        "bairro" => $bairro,
                        "cidade" => $cidade,
                        "telefone" => $telefone,
                        "itens_necessarios" => $itens_necessarios
                    );
                    array_push($pontos_arr, $ponto_item);
                }

                http_response_code(200);
                echo json_encode($pontos_arr);
            } else {
                http_response_code(200); //Retorna 200 mas com array vazio
                echo json_encode(array());
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("erro" => "Erro ao buscar pontos de doação: " . $e->getMessage()));
        }
    }
}

?>
