export default function Botao(props) {
  return (
    <button
      className={props.tipo}
      onClick={props.aoClicar}
      disabled={props.disabilitado}
    >
      {props.conteudo}
    </button>
  );
}
