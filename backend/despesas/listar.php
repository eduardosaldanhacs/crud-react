<?php
include ("../db.php");

$query = "SELECT * FROM tb_despesas";
$result = mysqli_query($conn, $query);

$dados = [];

while ($row = mysqli_fetch_assoc($result)) {
    $dados[] = $row;
}

header('Content-Type: application/json');
echo json_encode($dados);
