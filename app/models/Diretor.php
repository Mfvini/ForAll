<?php
    require_once 'Usuario.php';

    class Diretor extends Usuario {
        
        public function __construct(int $id, string $nome, string $email){
            parent::__construct($id, $nome, $email);
        }

        //Remove o psicólogo e limpa vínculos (salas e pacientes)
        public function excluirPsicologo(Psicologo $psicologo): string {
            //$db->query("DELETE FROM psicologos WHERE id = {$psicologo->id}");
            return "O registro do psicólogo e todas as suas salas de atendimento foram removidos com sucesso.";
        }
    }
?>