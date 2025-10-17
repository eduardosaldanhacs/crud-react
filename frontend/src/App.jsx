import { useEffect, useState } from "react";
import ListarFuncionarios from "./components/ListarFuncionarios";
import "./App.css";
import FuncionarioForm from "./components/FuncionarioForm";
import Notification from "./components/Notification";

function App() {
  const [funcionarios, setFuncionarios] = useState(
    JSON.parse(localStorage.getItem("funcionarios")) || []
  );

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

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
        setNotification({
          message: "Funcionário excluído com sucesso!",
          type: "alert alert-success",
        });
        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 3000);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onCadastroFuncionario(nome, cargo, salario, dataAdmissao) {
    try {
      const response = await fetch(
        "http://localhost/crud-react/backend/funcionarios.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            cargo,
            salario,
            dataAdmissao,
          }),
        }
      );

      const result = await response.json();

      if (result.status === "success") {
        setFuncionarios((prevFuncionarios) => [
          ...prevFuncionarios,
          result.funcionario,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //LISTAR FUNCIONARIOS
  useEffect(() => {
    //Efeito para executar
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
  }, []); //Depedência vazia, executa uma vez ao montar o componente

  useEffect(() => {
    //atualizar funcionarios no storage ao cadastrar novo funcionario
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
    setFuncionarios(funcionarios);
  }, [funcionarios]); //Efeito acontece ao mudar o estado de funcionarios

  return (
    <div className="container mt-5">
      <h1 className="text-primary">Lista de funcionarios</h1>
      <ListarFuncionarios
        funcionarios={funcionarios}
        onExcluirFuncionario={onExcluirFuncionario}
      />
      <FuncionarioForm onCadastroFuncionario={onCadastroFuncionario} />
      <Notification message={notification.message} type={notification.type} />
    </div>
  );
}

export default App;
