<?php
$conn = new mysqli('localhost', 'root', '', 'crud-react');

if (!$conn) {
    //die("Erro na conexão: " . mysqli_connect_error());
}