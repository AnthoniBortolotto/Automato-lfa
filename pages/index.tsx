import { Button, Grid, TextField, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import automatoNDeterministico from "../utils/nao-deterministico";
import { automato, transicao } from "../utils/types";

export default function Home() {
  const [alfabeto, setAlfabeto] = useState("");
  const [estadoInicial, setEstadoInicial] = useState("");
  const [stringValidacao, setStringValidacao] = useState("");
  const [estadosFinais, setEstadosFinais] = useState<string[]>([]);
  const [numeroEstadosFinais, setNumeroEstadosFinais] = useState(1);
  const [transicoes, setTransicoes] = useState<transicao[]>([]);
  const [numeroTransicoes, setNumeroTransicoes] = useState(1);
  const [estados, setEstados] = useState<string[]>([]);
  const [numeroEstados, setNumeroEstados] = useState(1);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [resposta, setResposta] = useState(false);

  const numeroEstadosMapObject = new Array<number>();
  for (let i = 0; i < numeroEstados; i++) {
    numeroEstadosMapObject.push(i);
  }

  const numeroEstadosFinaisMapObject = new Array<number>();
  for (let i = 0; i < numeroEstadosFinais; i++) {
    numeroEstadosFinaisMapObject.push(i);
  }
  const numeroTransicoesMapObject = new Array<number>();
  for (let i = 0; i < numeroTransicoes; i++) {
    numeroTransicoesMapObject.push(i);
  }
  function handleSubmit() {
    console.log("alfabeto", alfabeto);
    console.log("estadoInicial", estadoInicial);
    console.log("stringValidacao", stringValidacao);
    console.log("estadosFinais", estadosFinais);
    console.log("transicoes", transicoes);
    const automato: automato = {
      alfabeto: alfabeto.split(""),
      estadoInicial: estadoInicial,
      estadosFinais: estadosFinais,
      estados: estados,
      transicoes: transicoes,
    };
    console.log("automato", automato);
   const res = automatoNDeterministico(automato, stringValidacao);
    setResposta(res);
    setMostrarResposta(true);
  }

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        width: "90vw",
        margin: "auto",
        marginTop: "5vh",
        marginBottom: "5vh",
      }}
    >
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Alfabeto"
          value={alfabeto}
          onChange={(e) => {
            setAlfabeto(e.target.value);
          }}
        />
      </Grid>
      {
        // Estados
        numeroEstadosMapObject.map((item, index) => {
          return (
            <Grid item xs={12} key={index} sx={
              {
                marginTop: "3vh",
                marginBottom: "3vh",
              }
            }>
              <TextField
                variant="outlined"
                label={`Estado ${index + 1}`}
                value={estados[index] || ""}
                onChange={(e) => {
                  let newEstados = [...estados];
                  newEstados[index] = e.target.value;
                  setEstados(newEstados);
                }}
              />
            </Grid>
          );
        })
      }
      <Grid item xs={12} sx={
            {
              marginTop: "3vh",
              marginBottom: "3vh",
            }
          }>
        <Button
          variant="contained"
          onClick={() => {
            setNumeroEstados(numeroEstados + 1);
          }}
        >
          Adicionar Estado
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setNumeroEstados(numeroEstados - 1);
            setEstados(estados.slice(0, -1));
          }}
          sx={{ marginLeft: "1vw" }}
        >
          Remover Estado
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={estadoInicial}
          onChange={(e) => {
            setEstadoInicial(e.target.value);
          }}
          variant="outlined"
          label="Estado Inicial"
        />
      </Grid>
      {numeroEstadosFinaisMapObject.map((num) => {
        let swap = estadosFinais;
        return (
          <Grid key={num} item xs={12} sx={
            {
              marginTop: "3vh",
              marginBottom: "3vh",
            }
          }>
            <TextField
              variant="outlined"
              label={`Estado Final ${num + 1}`}
              onChange={(e) => {
                swap[num] = e.target.value;
                setEstadosFinais(swap);
              }}
            />
          </Grid>
        );
      })}

      <Grid item xs={12} sx={
            {
              marginTop: "3vh",
              marginBottom: "3vh",
            }
          }>
        <Button
          variant="contained"
          onClick={() => setNumeroEstadosFinais(numeroEstadosFinais + 1)}
        >
          Adicionar Estado Final
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setNumeroEstadosFinais(numeroEstadosFinais - 1);
            setEstadosFinais(estadosFinais.slice(0, -1));
          }}
          sx={{ marginLeft: "1vw" }}
        >
          Remover Estado Final
        </Button>
      </Grid>

      {numeroTransicoesMapObject.map((num) => {
        let swap = transicoes;
        return (
          <Grid key={`transicao ${num}`} container item xs={12} sx={
            {
              marginTop: "3vh",
              marginBottom: "3vh",
            }
          }>
            <Grid item xs={3}>
              <TextField
                value={swap[num] ? swap[num].estadoAtual : ""}
                variant="outlined"
                label="Estado atual da transição"
                onChange={(e) => {
                  swap[num] = {
                    estadoAtual: e.target.value,
                    estadoDestino: swap[num]?.estadoDestino || "",
                    simbolo: swap[num]?.simbolo || "",
                  };
                  setTransicoes([...swap]);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Simbolo da transição"
                value={swap[num] ? swap[num].simbolo : ""}
                onChange={(e) => {
                  swap[num] = {
                    estadoAtual: swap[num]?.estadoAtual || "",
                    estadoDestino: swap[num]?.estadoDestino || "",
                    simbolo: e.target.value,
                  };

                  setTransicoes([...swap]);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Estado destino da transição"
                value={swap[num] ? swap[num].estadoDestino : ""}
                onChange={(e) => {
                  swap[num] = {
                    estadoAtual: swap[num]?.estadoAtual || "",
                    estadoDestino: e.target.value,
                    simbolo: swap[num]?.simbolo || "",
                  };
                  setTransicoes([...swap]);
                }}
              />
            </Grid>
          </Grid>
        );
      })}
      <Grid item xs={12} sx={
            {
              marginTop: "3vh",
              marginBottom: "3vh",
            }
          }>
        <Button variant="contained" onClick={() => {
            setNumeroTransicoes(numeroTransicoes + 1);;
        }}>
          Adicionar Transição
        </Button>
        <Button
          color="error"
          sx={{
            marginLeft: "1vw",
          }}
          variant="contained"
          onClick={() => {
            setNumeroTransicoes(numeroTransicoes - 1);
            setTransicoes(transicoes.slice(0, -1));
          }}
        >
          Remover Transição
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={3}>
          <TextField
            variant="outlined"
            value={stringValidacao}
            onChange={(e) => {
              setStringValidacao(e.target.value);
            }}
            label="string para validar"
          />
        </Grid>
      </Grid>
      <Grid item xs={8} sx={
            {
              marginTop: "3vh",
              marginBottom: "3vh",
            }
          }>
        <Button
          sx={{
            width: "120px",
            height: "40px",
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Validar
        </Button>
      </Grid>
      <Grid item xs={12}>
        {mostrarResposta && (
          <Typography variant="h5">
            String {resposta ? "Aceita" : "Rejeitada"}
          </Typography>
        )}
        </Grid>
    </Grid>
  );
}
