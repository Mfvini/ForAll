<?php
/*Exibir erros para no futuro nos ajudar no Desenvolvimento
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);*/
//Configurações cruciais para a API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

//Se for uma requisição OPTIONS (pré-flight do navegador), encerra aqui
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

//Carrega a conexão
require_once 'app/database/Conexao.php';

//Pega a URL e envia para o .htaccess
$url = isset($_GET['url']) ? explode('/', $_GET['url']) : ['home'];

//Define qual Controller dever ser chamado
//Se a URL for 'paciente', vira 'PacienteController'
$controllerName = ucfirst($url[0]) . 'Controller';

//Caminho do arquivo do Controller
$controllerFile = "app/controllers/{$controllerName}.php";

//Lógica de Execução
if (file_exists($controllerFile)) {
    require_once $controllerFile; //Carrega o arquivo do Controller
    if (class_exists($controllerName)) {
        $controller = new $controllerName();

        //chama o método index()
        if (method_exists($controller, 'index')) {
            $controller->index();
        } else {
            echo json_encode(["error" => "Método index não encontrado no controller."]);
        }
    } else {
        echo json_encode(["error" => "Controller não encontrado."]);
    }
} else {
    // Se o arquivo não existe, a rota não existe
    echo json_encode(["error" => "Rota ou Controller não encontrado"]);
}

?>