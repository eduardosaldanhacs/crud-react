import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListarFuncionarios from "./components/ListarFuncionarios";
import "./App.css";
import FuncionarioForm from "./components/FuncionarioForm";
import Notification from "./components/Notification/Notification";

function App() {
  const [funcionarios, setFuncionarios] = useState(
    JSON.parse(localStorage.getItem("funcionarios")) || []
  );

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const location = useLocation();

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
          type: "notification_success",
        })
      } else {
        setNotification({
          message: "Erro ao excluir funcionário!",
          type: "notification_error",
        })
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

        setNotification({
          message: "Funcionario cadastrado com sucesso!",
          type: "notification_success",
        })
      } else {
        setNotification({
          message: "Erro ao cadastrar funcionario!",
          type: "notification_error",
        })
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

  useEffect(() => {
    if(location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type
      })
    }
  }, [location.state]);

  return (
    <div className="container-fluid p-5 bg-light">
      <h1 className="text-primary text-center mb-4">Lista de funcionarios</h1>
      <ListarFuncionarios
        funcionarios={funcionarios}
        onExcluirFuncionario={onExcluirFuncionario}
      />
      <FuncionarioForm onCadastroFuncionario={onCadastroFuncionario} />
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
}

export default App;
