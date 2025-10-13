<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

if ($request[0] !== 'api_teste') {
    http_response_code(404);
    echo json_encode(['erro' => 'Rota inválida']);
    exit;
}

$resource = $request[1] ?? null;
$id = $request[2] ?? null;

switch ($resource) {
    case 'despesas':
        switch ($method) {
            case 'GET':
                include 'despesas/listar.php';
                break;
            case 'POST':
                include 'despesas/criar.php';
                break;
            case 'PUT':
                $_PUT = json_decode(file_get_contents('php://input'), true);
                include 'despesas/atualizar.php';
                break;
            case 'DELETE':
                include 'despesas/deletar.php';
                break;
            default:
                http_response_code(405);
                echo json_encode(['erro' => 'Método não permitido']);
        }
        break;
    default:
        http_response_code(404);
        echo json_encode(['erro' => 'Endpoint não encontrado']);
}
