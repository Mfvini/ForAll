<?php
//Garantimos que o modelo está disponível
require_once 'app/models/Paciente.php';

class PacienteController {
    //O método index geralmente lista todos os recursos
    public function index(){
        // Inicialmente, vamos simular os dados que viriam do banco de dados.
        //Nas próximas etapas, chamaremos um método como $pacienteModel->findAll()
        $dados = [
            [
                'id' => 1,
                'nome' => 'João Caetano',
                'necessitaDoacao' => true,
                'dataCadastro' => '2026-05-01'
            ],
            [
                'id' => 2,
                'nome' => 'Maria Souza',
                'dataCadastro' => '2026-05-02'
            ]
        ];
        //Transformamos o arry PHP em JSON e enviamos para quem o chamo
        echo json_encode($dados);
    }
}

?>