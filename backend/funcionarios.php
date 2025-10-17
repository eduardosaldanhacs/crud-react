<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include('db.php');

$metodo = $_SERVER['REQUEST_METHOD'];


if ($metodo == "GET") {
    //BUSCAR FUNCIONARIO POR ID
    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "SELECT * FROM funcionarios WHERE id = $id";
        $result = $conn->query($sql);
        $funcionario = $result->fetch_assoc();
        if ($result) {
            echo json_encode($funcionario);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'mensagem' => 'Erro na consulta']);
            exit;
        }

        //BUSCAR TODOS OS FUNCIONARIOS
    } else {
        $sql = "SELECT * FROM funcionarios";
        $result = $conn->query($sql);
        $funcionarios = [];
        while ($row = $result->fetch_assoc()) {
            $funcionarios[] = $row;
        }
        if ($result) {
            echo json_encode($funcionarios);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'mensagem' => 'Erro na consulta']);
            exit;
        }
    }

    //DELETAR FUNCIONARIO
} else if ($metodo == "DELETE") {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $sql = "DELETE FROM funcionarios WHERE id = $id";
        if ($conn->query($sql)) {
            echo json_encode([
                'status' => 'success',
                'mensagem' => 'Funcionario deletado com sucesso'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'mensagem' => 'Erro ao deletar funcionario'
            ]);
        }
    }
    //CRIAR FUNCIONARIO
} else if (isset($metodo) && $metodo == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    if (empty($data['nome']) || empty($data['cargo']) || empty($data['salario']) || empty($data['dataAdmissao'])) {
        echo json_encode([
            'status' => 'error',
            'mensagem' => 'Dados incompletos'
        ]);
        exit;
    } else {
        $nome = isset($data['nome']) ? $data['nome'] : '';
        $cargo = isset($data['cargo']) ? $data['cargo'] : '';
        $salario = isset($data['salario']) ? $data['salario'] : '';
        $data_admissao = isset($data['dataAdmissao']) ? $data['dataAdmissao'] : '';

        $sql = "INSERT INTO funcionarios (nome, cargo, salario, data_admissao) 
            VALUES ('$nome', '$cargo', '$salario', '$data_admissao')";

        if ($conn->query($sql)) {
            $id = $conn->insert_id; // pega o ID do último inserido
            echo json_encode([
                'status' => 'success',
                'mensagem' => 'Funcionario criado com sucesso',
                'funcionario' => [
                    'id' => $id,
                    'nome' => $nome,
                    'cargo' => $cargo,
                    'salario' => $salario,
                    'data_admissao' => $data_admissao
                ]
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'mensagem' => 'Erro ao criar funcionario'
            ]);
        }
    }
    //ATUALIZAR FUNCIONARIO
} else if ($metodo === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        echo json_encode([
            'status' => 'error',
            'mensagem' => 'Corpo da requisição PUT inválido ou não é JSON',
            'debug' => file_get_contents("php://input")
        ]);
        exit;
    }

    $id = $data['id'];
    $nome = $data['nome'];
    $cargo = $data['cargo'];
    $salario = str_replace('.', '', $data['salario']);
    $salario = str_replace(',', '.', $salario); // Converter para formato decimal
    $dataAdmissao = $data['dataAdmissao'];

    $sql = "UPDATE funcionarios 
            SET nome='$nome', cargo='$cargo', salario='$salario', data_admissao='$dataAdmissao' 
            WHERE id=$id";

    if ($conn->query($sql)) {
        echo json_encode(["status" => "ok"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => $conn->error]);
    }
}
$conn->close();
