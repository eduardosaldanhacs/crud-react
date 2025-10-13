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
        console.log(result);
        setFuncionario(result);
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
      }
    }

    buscarFuncionario(id); // chama a função assim que o id mudar
  }, [id]);

  const handleSalvar = async (dadosAtualizados) => {
    try {
      const response = await fetch(
        "http://localhost/crud-react/backend/funcionarios.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosAtualizados),
        }
      );

      const result = await response.json();

      if (result.status === "ok") {
        //Funcionário atualizado com sucesso!
        navigate("/");
      } else {
        alert("Erro ao atualizar funcionário: " + (result.mensagem || ""));
      }
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Erro ao atualizar funcionário.");
    }
  };

  if (!funcionario) return <div className="text-center"><img src="/loading.gif" alt="" /></div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Editar Funcionário</h2>
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>
      <FuncionarioForm
        onCadastroFuncionario={handleSalvar}
        funcionario={funcionario} // passa os dados para o form
      />
    </div>
  );
}

export default EditarFuncionario;
