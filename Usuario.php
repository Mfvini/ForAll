<?php
    //Encapsulamento. Utilizando protected para que as classes filhas possam acessar os atributos, mas o mundo externo não e, um Método Construtor.
    class Usuario {
        protected int $id;
        protected string $nome;
        protected string $email;

        public function __construct(int $id, string $nome, string $email){
            $this->id = $id;
            $this->nome = $nome;
            $this->email = $email;
        }

        public function getDadosBase() : string {
            return "ID: {$this->id} | Nome: {$this->nome} | Email: {$this->email}";
        }
    }

?>