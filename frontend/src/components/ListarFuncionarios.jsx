import { useNavigate } from "react-router-dom";
import {formatarReal } from '../js/functions';
function ListarFuncionarios({funcionarios, onExcluirFuncionario }) {
  const navigate = useNavigate();
  return (
    <div className="row">
      {funcionarios.map((funcionario) => (
        <div className="col-md-4 mb-2" key={funcionario.id}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{funcionario.nome}</h5>
              <p className="card-text">Cargo: {funcionario.cargo}</p>
              <p className="card-text">Data Admissão:  
                {funcionario.data_admissao ? new Date(funcionario.data_admissao).toLocaleDateString("pt-BR") : ''}
                </p>
              <p className="card-text">Salário: {formatarReal(funcionario.salario)}</p>
            </div>
          </div>
          <button
            className="btn btn-danger mt-2"
            onClick={() => onExcluirFuncionario(funcionario.id)}
          >
            Excluir
          </button>
          <button
            className="btn btn-primary mt-2 ms-2"
            onClick={() => navigate(`/funcionario/${funcionario.id}`)}
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  );
}
export default ListarFuncionarios;
