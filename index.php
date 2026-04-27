<?php
//Exibir erros para no futuro nos ajudar no Desenvolvimento
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//Importa a Conexão
require_once 'app/database/Conexao.php';

//Pega a URL e envia para o .htaccess
$url = isset($_GET['url']) ? explode('/', $_GET['url']) : ['home'];

//Define qual Controller dever ser chamado
//Se a URL for 'paciente', vira 'PacienteController'
$controllerName = ucfirst($url[0]) . 'Controller';

echo "<h1>Estrutura MVC-FOR ALL</h1>";
echo "<p>Você está tentando acessar <strong>$controllerName</strong></p>";

//No futuro, aqui o index vai dar um 'new $controllerName()'

?>