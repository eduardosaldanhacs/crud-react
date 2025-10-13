import { useState, useEffect } from "react";
import InputSalario from "./InputSalario";

function FuncionarioForm({ funcionario, onCadastroFuncionario }) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [salario, setSalario] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  // Preenche os campos se for edição
  useEffect(() => {
    if (funcionario) {
      setNome(funcionario.nome || "");
      setCargo(funcionario.cargo || "");
      setSalario(funcionario.salario || "");
      setDataAdmissao(funcionario.data_admissao || "");
    }
  }, [funcionario]);

  const verificarCampos = (e) => {
    e.preventDefault();
    if (!nome || !cargo || !salario || !dataAdmissao) {
      alert("Preencha todos os campos!");
    } else {
      onCadastroFuncionario(
        funcionario?.id, // id
        nome,
        cargo,
        salario,
        dataAdmissao
      );

      // Se for cadastro, limpa os campos
      if (!funcionario) {
        setNome("");
        setCargo("");
        setSalario("");
        setDataAdmissao("");
      }
    }
  };

  return (
    <form
      className="row justify-content-center align-items-center mt-4"
      onSubmit={verificarCampos}
    >
      <div className="col-6 bg-light py-3">
        <div>
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">Cargo</label>
          <input
            type="text"
            className="form-control"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </div>

        <InputSalario
          className="form-control"
          type="text"
          placeholder="1.000,00"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
        />

        <div>
          <label className="form-label">Data de admissão</label>
          <input
            type="date"
            className="form-control"
            value={dataAdmissao}
            onChange={(e) => setDataAdmissao(e.target.value)}
          />
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-primary" type="submit">
            {funcionario ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </div>
      </div>
    </form>
  );
}
export default FuncionarioForm;
