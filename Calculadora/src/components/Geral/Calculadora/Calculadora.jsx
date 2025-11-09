import React, { useState } from "react";
import Botao from "../../UI/Botao/Botao";
import "./Calculadora.css";

export default function Calculadora() {
  const [display, setDisplay] = useState("0");
  const [primeiroValor, setPrimeiroValor] = useState(null);
  const [operador, setOperador] = useState(null);
  const [aguardandoSegundoValor, setAguardandoSegundoValor] = useState(false);

  // Função para adicionar números ao display
  const adicionarNumero = (numero) => {
    if (aguardandoSegundoValor) {
      setDisplay(String(numero));
      setAguardandoSegundoValor(false);
    } else {
      setDisplay(display === "0" ? String(numero) : display + numero);
    }
  };

  // Função para adicionar ponto decimal
  const adicionarPonto = () => {
    if (aguardandoSegundoValor) {
      setDisplay("0.");
      setAguardandoSegundoValor(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Função para limpar a calculadora
  const limpar = () => {
    setDisplay("0");
    setPrimeiroValor(null);
    setOperador(null);
    setAguardandoSegundoValor(false);
  };

  // Função para inverter o sinal
  const inverterSinal = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  // Função para calcular porcentagem
  const calcularPorcentagem = () => {
    const valor = parseFloat(display);
    setDisplay(String(valor / 100));
  };

  // Função para definir operador
  const definirOperador = (novoOperador) => {
    const valorInput = parseFloat(display);

    if (primeiroValor === null) {
      setPrimeiroValor(valorInput);
    } else if (operador) {
      const resultado = calcular();
      setDisplay(String(resultado));
      setPrimeiroValor(resultado);
    }

    setOperador(novoOperador);
    setAguardandoSegundoValor(true);
  };

  // Função para realizar o cálculo
  const calcular = () => {
    const valorInput = parseFloat(display);

    if (primeiroValor === null || operador === null) return valorInput;

    switch (operador) {
      case "+":
        return primeiroValor + valorInput;
      case "-":
        return primeiroValor - valorInput;
      case "*":
        return primeiroValor * valorInput;
      case "/":
        return primeiroValor / valorInput;
      default:
        return valorInput;
    }
  };

  // Função para executar o cálculo final
  const executarCalculo = () => {
    if (primeiroValor === null || operador === null) return;

    const resultado = calcular();
    setDisplay(String(resultado));
    setPrimeiroValor(null);
    setOperador(null);
    setAguardandoSegundoValor(false);
  };

  return (
    <div className="container">
      <div className="display">
        <input type="text" value={display} readOnly />
      </div>
      <div className="buttons">
        {/* Primeira linha */}
        <div className="row">
          <Botao tipo="btn secundario" conteudo="C" aoClicar={limpar} />
          <Botao
            tipo="btn secundario"
            conteudo="+/-"
            aoClicar={inverterSinal}
          />
          <Botao
            tipo="btn secundario"
            conteudo="%"
            aoClicar={calcularPorcentagem}
          />
          <Botao
            tipo="btn secundario"
            conteudo="/"
            aoClicar={() => definirOperador("/")}
          />
        </div>

        {/* Segunda linha */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="7"
            aoClicar={() => adicionarNumero(7)}
          />
          <Botao
            tipo="btn primario"
            conteudo="8"
            aoClicar={() => adicionarNumero(8)}
          />
          <Botao
            tipo="btn primario"
            conteudo="9"
            aoClicar={() => adicionarNumero(9)}
          />
          <Botao
            tipo="btn secundario"
            conteudo="×"
            aoClicar={() => definirOperador("*")}
          />
        </div>

        {/* Terceira linha */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="4"
            aoClicar={() => adicionarNumero(4)}
          />
          <Botao
            tipo="btn primario"
            conteudo="5"
            aoClicar={() => adicionarNumero(5)}
          />
          <Botao
            tipo="btn primario"
            conteudo="6"
            aoClicar={() => adicionarNumero(6)}
          />
          <Botao
            tipo="btn secundario"
            conteudo="-"
            aoClicar={() => definirOperador("-")}
          />
        </div>

        {/* Quarta linha */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="1"
            aoClicar={() => adicionarNumero(1)}
          />
          <Botao
            tipo="btn primario"
            conteudo="2"
            aoClicar={() => adicionarNumero(2)}
          />
          <Botao
            tipo="btn primario"
            conteudo="3"
            aoClicar={() => adicionarNumero(3)}
          />
          <Botao
            tipo="btn secundario"
            conteudo="+"
            aoClicar={() => definirOperador("+")}
          />
        </div>

        {/* Quinta linha */}
        <div className="row">
          <Botao
            tipo="btn primario"
            conteudo="0"
            aoClicar={() => adicionarNumero(0)}
          />
          <Botao tipo="btn primario" conteudo="." aoClicar={adicionarPonto} />
          <Botao
            tipo="btn secundario"
            conteudo="="
            aoClicar={executarCalculo}
          />
        </div>
      </div>
    </div>
  );
}
