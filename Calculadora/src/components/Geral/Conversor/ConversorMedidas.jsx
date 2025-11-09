import { useState } from "react";
import Botao from "../../UI/Botao/Botao";
import "../../UI/Botao/Botao";
import "./Conversor.css";

export default function ConversorMedidas() {
  const [valor, setValor] = useState("");
  const [deUnidade, setDeUnidade] = useState("metros");
  const [paraUnidade, setParaUnidade] = useState("quilometros");
  const [resultado, setResultado] = useState("");

  // Fatores de conversão para diferentes unidades
  const fatores = {
    metros: 1,
    quilometros: 0.001,
    centimetros: 100,
    milimetros: 1000,
    pes: 3.28084,
    polegadas: 39.3701,
    milhas: 0.000621371,
    jardas: 1.09361,
  };

  const converter = () => {
    if (!valor || isNaN(valor)) {
      setResultado("Digite um valor válido");
      return;
    }

    const valorNumerico = parseFloat(valor);
    const valorEmMetros = valorNumerico / fatores[deUnidade];
    const valorConvertido = valorEmMetros * fatores[paraUnidade];

    setResultado(
      `${valor} ${deUnidade} = ${valorConvertido.toFixed(6)} ${paraUnidade}`,
    );
  };

  const limpar = () => {
    setValor("");
    setResultado("");
  };

  const inserirNumero = (numero) => {
    setValor((prev) => (prev === "" ? numero : prev + numero));
  };

  const inserirPonto = () => {
    if (!valor.includes(".")) {
      setValor((prev) => (prev === "" ? "0." : prev + "."));
    }
  };

  const apagarUltimo = () => {
    setValor((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };

  return (
    <div className="container conversor">
      <div className="display">
        <input
          type="text"
          value={valor}
          placeholder="Digite o valor"
          onChange={(e) => setValor(e.target.value)}
          className="input-valor"
        />
      </div>

      <div className="unidades">
        <div className="unidade-group">
          <label>De:</label>
          <select
            value={deUnidade}
            onChange={(e) => setDeUnidade(e.target.value)}
            className="select-unidade"
          >
            <option value="metros">Metros</option>
            <option value="quilometros">Quilômetros</option>
            <option value="centimetros">Centímetros</option>
            <option value="milimetros">Milímetros</option>
            <option value="pes">Pés</option>
            <option value="polegadas">Polegadas</option>
            <option value="milhas">Milhas</option>
            <option value="jardas">Jardas</option>
          </select>
        </div>

        <div className="unidade-group">
          <label>Para:</label>
          <select
            value={paraUnidade}
            onChange={(e) => setParaUnidade(e.target.value)}
            className="select-unidade"
          >
            <option value="metros">Metros</option>
            <option value="quilometros">Quilômetros</option>
            <option value="centimetros">Centímetros</option>
            <option value="milimetros">Milímetros</option>
            <option value="pes">Pés</option>
            <option value="polegadas">Polegadas</option>
            <option value="milhas">Milhas</option>
            <option value="jardas">Jardas</option>
          </select>
        </div>
      </div>

      <div className="resultado">
        <input
          type="text"
          value={resultado}
          readOnly
          placeholder="Resultado aparecerá aqui"
          className="input-resultado"
        />
      </div>

      <div className="buttons">
        {/* Primeira linha - Números */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="7"
            aoClicar={() => inserirNumero("7")}
          />
          <Botao
            tipo="btn primario"
            conteudo="8"
            aoClicar={() => inserirNumero("8")}
          />
          <Botao
            tipo="btn primario"
            conteudo="9"
            aoClicar={() => inserirNumero("9")}
          />
          <Botao tipo="btn secundario" conteudo="<-" aoClicar={apagarUltimo} />
        </div>

        {/* Segunda linha - Números */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="4"
            aoClicar={() => inserirNumero("4")}
          />
          <Botao
            tipo="btn primario"
            conteudo="5"
            aoClicar={() => inserirNumero("5")}
          />
          <Botao
            tipo="btn primario"
            conteudo="6"
            aoClicar={() => inserirNumero("6")}
          />
          <Botao tipo="btn secundario" conteudo="C" aoClicar={limpar} />
        </div>

        {/* Terceira linha - Números */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="1"
            aoClicar={() => inserirNumero("1")}
          />
          <Botao
            tipo="btn primario"
            conteudo="2"
            aoClicar={() => inserirNumero("2")}
          />
          <Botao
            tipo="btn primario"
            conteudo="3"
            aoClicar={() => inserirNumero("3")}
          />
          <Botao tipo="btn primario" conteudo="." aoClicar={inserirPonto} />
        </div>

        {/* Quarta linha - Zero e Conversão */}
        <div className="row">
          <Botao
            tipo="btn primario grande"
            conteudo="0"
            aoClicar={() => inserirNumero("0")}
          />
          <Botao tipo="btn secundario" conteudo="=" aoClicar={converter} />
        </div>
      </div>
    </div>
  );
}
