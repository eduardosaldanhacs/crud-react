import { useEffect, useState } from "react";
import ListarFuncionarios from "./components/ListarFuncionarios";
import "./App.css";
import FuncionarioForm from "./components/FuncionarioForm";

function App() {
  const [funcionarios, setFuncionarios] = useState(
    JSON.parse(localStorage.getItem("funcionarios")) || []
  );

  async function onExcluirFuncionario(id) {
    try {
      //tento acessar a api
      const response = await fetch(
        `http://localhost/crud-react/backend/funcionarios.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      //armazeno o resultado numa variavel
      const result = await response.json();
      //se o status da api for success
      if (result.status == "success") {
        //atualizo o state de funcionarios com todos eles menos o que tem o id que será deletado
        setFuncionarios(
          funcionarios.filter((funcionario) => funcionario.id !== id)
        );
      } else {
        console.log("Erro ao deletar");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onCadastroFuncionario(id, nome, cargo, salario, dataAdmissao) {
    try {
      const response = await fetch(
        "http://localhost/crud-react/backend/funcionarios.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            nome,
            cargo,
            salario,
            dataAdmissao,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      console.log("Resultado do cadastro:", result);
      if (result.status === "success") {
        setFuncionarios((prevFuncionarios) => [
          ...prevFuncionarios,
          result.funcionario,
        ]);
      }
    } catch (error) {
      //console.log(error);
    }
  }

  useEffect(() => {
    const fetchFuncionarios = async () => {
      //api para listar 
      const response = await fetch(
        "http://localhost/crud-react/backend/funcionarios.php",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setFuncionarios(data);
    };
    fetchFuncionarios();
  }, []);

  useEffect(() => { //atualizar funcionarios no storage ao cadastrar novo funcionario
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
  }, [funcionarios]);

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Lista de funcionarios</h1>
      <ListarFuncionarios
        funcionarios={funcionarios}
        onExcluirFuncionario={onExcluirFuncionario}
      />
      <FuncionarioForm onCadastroFuncionario={onCadastroFuncionario} />
    </div>
  );
}

export default App;
