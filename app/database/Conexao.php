<?php

class Conexao {
    private static $instancia;

    public static function getConexao() {
        $host = 'localhost';
        $port = '3307';
        $db = 'db_forall';
        $user = 'root';
        $pass = 'root';

        if (!isset(self::$instancia)) {
            try {

                $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
                self::$instancia = new PDO($dsn, $user, $pass);
                //Habilita erros do PDO(Fundamental para o desenvolvedor!)
                self::$instancia->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Erro de conexão: " . $e->getMessage());
            }
        }
        return self::$instancia;
    }
}

?>