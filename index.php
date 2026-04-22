<?php
    require_once 'Usuario.php';
    require_once 'Psicologo.php';
    require_once 'Paciente.php';
    require_once 'Diretor.php';

    echo "<h1> Sistema FOR ALL - Painel de Controle</h1>";

    //1. Criando um Psicólogo Voluntário
    $psicologo = new Psicologo(1, "Ana Souza", "ana.psico@email.com", "CRP-12/34567", "Terapia Cognitivo-Comportamental");
    //2. Criando um Paciente que necessita de doação
    $paciente = new Paciente(10, "Carlos Silva", "carlos.silva@email.com", true);
    //3. Criando um Diretor do Sistema
    $diretor = new Diretor(99, "Vinicius Fernandes", "vinicius.fernandes@forall.org.com");

    echo "<h3>Dados do Atendimento</h3>";
    echo "<p><strong>Psicólogo:</strong>" . $psicologo->exibirPerfil() . "</p>";
    echo "<p><strong>Paciente:</strong>" . $paciente->getDadosBase() . "</p>";
    echo "<p><strong>Necessita de Alimentos?</strong>" . $paciente->getStatusDoacao() . "</p>";

    echo "<hr>";

    echo "<h3>Ações do Administrador</h3>";
    //Simulando a denúncia e exclusão
    echo "<p><em>Simulando recebimento de denúncia de má conduta...</em></p>";
    echo "<p style='color: red;'>" . $diretor->excluirPsicologo($psicologo) . "</p>";

?>