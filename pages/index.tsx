import { Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [alfabeto, setAlfabeto] = useState("");
  const [estadoInicial, setEstadoInicial] = useState("");
  const [stringValidacao, setStringValidacao] = useState("");
  const [estadosFinais, setEstadosFinais] = useState<string[]>([]);
  const [numeroEstadosFinais, setNumeroEstadosFinais] = useState(1);
  const numeroEstadosFinaisMapObject = new Array<number>();
  for (let i = 0; i < numeroEstadosFinais; i++) {
    numeroEstadosFinaisMapObject.push(i);
  }
  function handleSubmit() {
    console.log("alfabeto", alfabeto);
    console.log("estadoInicial", estadoInicial);
    console.log("stringValidacao", stringValidacao);
    console.log("estadosFinais", estadosFinais);
  }
  useEffect(() => {}, []);

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
          <Grid item xs={12}>
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

      <Grid item xs={3}>
        <Button
          variant="contained"
          onClick={() => setNumeroEstadosFinais(numeroEstadosFinais + 1)}
        >
          Adicionar Estado Final
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setNumeroEstadosFinais(numeroEstadosFinais - 1);
              setEstadosFinais(estadosFinais.slice(0, -1));
            }}
          >
            Remover Estado Final
          </Button>
        </Grid>
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
      <Grid item xs={8}>
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
    </Grid>
  );
}
