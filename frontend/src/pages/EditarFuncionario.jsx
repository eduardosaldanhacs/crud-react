import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FuncionarioForm from "../components/FuncionarioForm";

function EditarFuncionario() {
  const { id } = useParams(); // pega o :id da URL
  const [funcionario, setFuncionario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarFuncionario(id) {
      try {
        const response = await fetch(
          `http://localhost/crud-react/backend/funcionarios.php?id=${id}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setFuncionario(result);
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
      }
    }

    buscarFuncionario(id); // chama a função assim que o id mudar
  }, [id]);

  async function onAtualizaFuncionario(id, nome, cargo, salario, dataAdmissao) {
    try {
      const dadosAtualizados = {
        id,
        nome,
        cargo,
        salario,
        dataAdmissao,
      };
      console.log(dadosAtualizados);
      const response = await fetch(
        "http://localhost/crud-react/backend/funcionarios.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosAtualizados), //o json.stringfy só aceita um argumento principal, é preciso colocar todos os dados dentro de um objeto/array, no caso a dadosAtualizados
        }
      );

      const result = await response.json();

      if (result.status === "ok") {
        navigate("/", {
          state: { message: "Funcionario atualizado com sucesso!", type: "notification_success"},
        }); 
      } else {
        alert("Erro ao atualizar funcionário");
      }
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
    }
  }

  if (!funcionario)
    return (
      <div className="gif-on-center">
        <img src="/loading.gif" alt="" />
      </div>
    );

  return (
    <div className="container mt-4">
      <h2 className="text-center">Editar Funcionário</h2>
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>
      <FuncionarioForm
        onAtualizaFuncionario={onAtualizaFuncionario}
        funcionario={funcionario} // passa os dados para o form
      />
    </div>
  );
}

export default EditarFuncionario;
