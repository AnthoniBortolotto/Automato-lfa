//deterministico

import { automato } from "./types";

//definição formal do automato
const inputA = {
  estados: ["q0", "q1", "q2", "q3"], //estados
  alfabeto: ["a", "b"], // simbolos permitidos
  transicoes: [
    { estadoAtual: "q0", simbolo: "a", estadoDestino: "q1" },
    { estadoAtual: "q0", simbolo: "b", estadoDestino: "q2" },
    { estadoAtual: "q0", simbolo: "b", estadoDestino: "q3" },
    { estadoAtual: "q1", simbolo: "a", estadoDestino: "q1" },
    { estadoAtual: "q1", simbolo: "b", estadoDestino: "q3" },
    { estadoAtual: "q2", simbolo: "a", estadoDestino: "q1" },
    { estadoAtual: "q2", simbolo: "b", estadoDestino: "q2" },
    { estadoAtual: "q3", simbolo: "a", estadoDestino: "q3" },
    { estadoAtual: "q3", simbolo: "b", estadoDestino: "q3" },
  ],
  estadoInicial: "q0", // estado onde começa a leitura
  estadosFinais: ["q3"], //estados onde é aceito finalizar a string
};

const automatoB = {
  estados: ["q0", "q1", "q2", "q3"], //estados
  alfabeto: ["a"], // simbolos permitidos
  transicoes: [{ estadoAtual: "q0", simbolo: "a", estadoDestino: "q1" }],
  estadoInicial: "q0",
  estadosFinais: ["q3"],
};
//string de entrada
const inputB = "abb";

export default function automatoNDeterministico(
  auto: automato,
  stringValidar: string
): boolean {
  function getTransicoesPossiveis(
    automatoRecebido: automato,
    simbolo: string,
    estadoAtual: string
  ) {
    return automatoRecebido.transicoes.filter(
      (transicao) =>
        transicao.estadoAtual === estadoAtual && transicao.simbolo === simbolo
    );
  }

  function getTransicoesPossiveisComSimbolo(
    automatoRecebido: automato,
    simbolo: string
  ) {
    return automatoRecebido.transicoes.filter(
      (value) => value.simbolo === simbolo
    );
  }

  const respostasVerdadeiras = new Array<boolean>();

  let verdadeiraResposta = new Array<boolean>();

  //automato finito não deterministico que valida a string de entrada
  function main(
    automatoRecebido: automato,
    stringDeEntrada: string,
    estadoInicial?: string
  ): boolean {
    let estadoAtual = estadoInicial || automatoRecebido.estadoInicial;
    for (let i = 0; i < stringDeEntrada.length; i++) {
      //  console.log("estado atual: ", estadoAtual);
      const simbolo = stringDeEntrada[i];
      //arrays with all transitions with the current symbol
      const transicoesPossiveis = getTransicoesPossiveis(
        automatoRecebido,
        simbolo,
        estadoAtual
      );
      //   console.log(transicoesPossiveis);
      if (transicoesPossiveis.length === 0) return false;
      const respostas = new Array<boolean>();
      transicoesPossiveis.forEach((transicao) => {
        respostas.push(
          main(
            automatoRecebido,
            stringDeEntrada.slice(i + 1),
            transicao.estadoDestino
          )
        );
      });
      if (!estadoInicial && i === stringDeEntrada.length - 1) {
        verdadeiraResposta = respostas;
        console.log("res: ", estadoAtual, ": ", respostas);
      }
      //   estadoAtual = transicoesPossiveis[0].estadoDestino;
    }
    return automatoRecebido.estadosFinais.includes(estadoAtual);
  }
  let resultado = false;
  try {
    main(inputA, inputB);
  } catch (error) {
    console.log(error);
    resultado = false;
  }

  console.log("Resposta: ", verdadeiraResposta.includes(true));
  return verdadeiraResposta.includes(true);
}
