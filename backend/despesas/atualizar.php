<?php
include 'db.php';

// Captura o ID da URL (vem do index.php)
$id = $_GET['id'] ?? null;
$dados = json_decode(file_get_contents('php://input'), true);

$nome = $dados['nome'] ?? null;
$valor = $dados['valor'] ?? null;

if (!$id || !$nome || !$valor) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados incompletos ou ID ausente']);
    exit;
}

$query = "UPDATE tb_despesas SET despesa = '$nome', valor = '$valor' WHERE id = $id";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(['mensagem' => 'Despesa atualizada com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao atualizar despesa']);
}
