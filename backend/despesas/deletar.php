<?php
include 'db.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['erro' => 'ID não informado']);
    exit;
}

$query = "DELETE FROM tb_despesas WHERE id = $id";
$result = mysqli_query($conn, $query);

if ($result) {
    echo json_encode(['mensagem' => 'Despesa deletada com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao deletar despesa']);
}
