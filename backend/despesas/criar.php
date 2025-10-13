<?php
include 'db.php';

// Receber dados do corpo da requisição
$dados = json_decode(file_get_contents('php://input'), true);

$nome = $dados['nome'] ?? null;
$valor = $dados['valor'] ?? null;

if (!$nome || !$valor) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados incompletos']);
    exit;
}

$query = "INSERT INTO tb_despesas (despesa, valor) VALUES ('$nome', '$valor')";
$result = mysqli_query($conn, $query);

if ($result) {
    http_response_code(201); // Created
    echo json_encode(['mensagem' => 'Despesa criada com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao criar despesa']);
}
