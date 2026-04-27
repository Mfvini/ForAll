<?php
    require_once 'Usuario.php';
    // A classe Pacientes herda da classe Usuario, adicionando a propriedade $necessitaDoacao e um método para obter o status de doação.
    class Paciente extends Usuario {
        private bool $necessitaDoacao;
        // O construtor da classe Pacientes chama o construtor da classe Usuario para inicializar as propriedades herdadas e também inicializa a propriedade $necessitaDoacao.
        public function __construct(int $id, string $nome, string $email, bool $necessitaDoacao){
           parent::__construct($id, $nome, $email);
           $this->necessitaDoacao = $necessitaDoacao;
        }
        // O método getStatusDoacao retorna uma string indicando se o paciente necessita de doação ou não, com base no valor da propriedade $necessitaDoacao.
        public function getStatusDoacao() : string {
            return $this->necessitaDoacao ? "Sim, aguardando cesta basica." : "Não necessito no momento.";
        }
    }

?>