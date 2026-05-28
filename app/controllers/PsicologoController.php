<?php
// Inclui o arquivo do Model correspondente
require_once 'app/models/Psicologo.php';

class PsicologoController {
    private $db;

    // Recebe a conexão com PDO do index.php/roteador
    public function __construct($db) {
        $this->db = $db;
    }

    // Método principal que o roteador vai chamar para o método GET
    public function index() {
        //Define o cabeçalho correspondente como JSON e permitir acesso do React(CORS)
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Methods: GET");
        
        // Instancia o Model
        $psicologo = new Psicologo($this->db);
        $stmt = $psicologo->listarTodos();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $psicologos_arr = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);

                $psicologos_item = array(
                    "id" => (int)$id,
                    "nome" => $nome,
                    "crp" => $crp,
                    "telefone" => $telefone,
                    "disponibilidade" => $disponibilidade
                );

                array_push($psicologos_arr, $psicologos_item);
            }

            http_response_code(200);
            echo json_encode($psicologos_arr, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(200);
            echo json_encode(array());
        }
    }
}

?>