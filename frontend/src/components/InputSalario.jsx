import { useState, useEffect } from "react";

function InputSalario({ value, onChange, ...rest }) {
  const [valor, setValor] = useState("");

  function formatarValor(valorDigitado) {
    if (!valorDigitado) return "";

    const apenasNumeros = valorDigitado.toString().replace(/\D/g, "");
    if (!apenasNumeros) return "";

    const numero = (Number(apenasNumeros) / 100).toFixed(2);
    return numero.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function handleChange(event) {
    const valorFormatado = formatarValor(event.target.value);
    setValor(valorFormatado);
    // Remove máscara antes de enviar pro pai
    const valorNumerico = valorFormatado.replace(/\./g, "").replace(",", ".");
    if (onChange) onChange({ target: { value: valorNumerico } });
  }

  // Atualiza o valor inicial (ex: quando vem do banco)
  useEffect(() => {
    if (value !== undefined && value !== null) {
      const formatado = formatarValor(value.toString());
      setValor(formatado);
    }
  }, [value]);

  return (
    <div>
      <label className="form-label">Salário</label>
      <input
        {...rest}
        type="text"
        className="form-control"
        value={valor}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputSalario;
