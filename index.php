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

//Simulando uma resposta da API
$response = [
    "status" => "success",
    "message" => "Conectado ao backend com sucesso",
    "controller_alvo" => $controllerName
];

echo json_encode($response);

/*echo "<h1>Estrutura MVC-FOR ALL</h1>";
echo "<p>Você está tentando acessar <strong>$controllerName</strong></p>";*/

//No futuro, aqui o index vai dar um 'new $controllerName()'

?>