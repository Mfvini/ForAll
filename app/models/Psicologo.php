<?php
    //Herança. A classe Psicologo herda os atributos e métodos da classe Usuario, além de adicionar seus próprios atributos e métodos específicos.
    require_once 'Usuario.php';

    class Psicologo extends Usuario {
        private string $crp;
        private string $especialidade;

        public function __construct(int $id, string $nome, string $email, string $crp, string $especialidade){
            //Chamamos o construtor da classe pai (Usuario) para inicializar os atributos herdados.
            parent::__construct($id, $nome, $email);
            $this->crp = $crp;
            $this->especialidade = $especialidade;
        }

        public function exibirPerfil() : string {
            //Utilizamos o método getDadosBase da classe pai para obter os dados básicos do usuário e depois adicionamos as informações específicas do psicólogo.
            $base = parent::getDadosBase();
            return "{$base} | CRP: {$this->crp} | Especialidade: {$this->especialidade}";
        }
    }

?>