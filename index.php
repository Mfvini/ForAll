<?php
/* Exibir erros para nos ajudar no Desenvolvimento */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Configurações cruciais para a API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Se for uma requisição OPTIONS (pré-flight do navegador), encerra aqui
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

// Carrega a conexão - Ajustado para a pasta correta (app/models/)
require_once 'app/database/Conexao.php';

// Pega a URL vinda do .htaccess ou Query String
$url = isset($_GET['url']) ? explode('/', $_GET['url']) : ['home'];

// Define qual Controller deve ser chamado
$controllerName = ucfirst($url[0]) . 'Controller';
$controllerFile = "app/controllers/{$controllerName}.php";

// Descobre o método HTTP da requisição (GET, POST, etc.)
$metodoHttp = $_SERVER['REQUEST_METHOD'];

// Lógica de Execução Roteada
if (file_exists($controllerFile)) {
    require_once $controllerFile;
    
    if (class_exists($controllerName)) {
        $controller = new $controllerName();

        // Roteamento inteligente para o UsuarioController
        if ($controllerName === 'UsuarioController') {
            if ($metodoHttp === 'POST' && isset($url[1]) && $url[1] === 'cadastrar') {
                $controller->cadastrar();
            } elseif ($metodoHttp === 'POST' && isset($url[1]) && $url[1] === 'login') {
                $controller->login();
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Ação de usuário não encontrada. Use /usuario/cadastrar ou /usuario/login"]);
            }
        } else {
            // Padrão para os outros controllers (chama o index se for GET)
            if (method_exists($controller, 'index')) {
                $controller->index();
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Método index não encontrado no controller."]);
            }
        }
    } else {
        http_response_code(404);
        echo json_encode(["error" => "Classe do Controller não encontrada."]);
    }
} else {
    http_response_code(404);
    echo json_encode(["error" => "Rota ou Controller não encontrado."]);
}
?>