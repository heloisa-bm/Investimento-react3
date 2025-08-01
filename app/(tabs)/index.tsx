import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#efefef",
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: "#AA2200",
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "#121212",
    textAlign: "center",
  },
  input: {
    width: "80%",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
});

export default function Index(): JSX.Element {
  const [mensal, setMensal] = useState<string>("");
  const [meses, setMeses] = useState<string>("");
  const [jurosMensal, setJurosMensal] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");

  const calcularInvestimento = (): void => {
    const mensalNum = parseFloat(mensal.replace(",", "."));
    const t = parseInt(meses);
    const i = parseFloat(jurosMensal.replace(",", ".")) / 100;

    if (isNaN(mensalNum) || isNaN(t) || isNaN(i)) {
      setResultado("Preencha todos os campos corretamente.");
      return;
    }

    // Sem juros (soma simples)
    const montanteS = mensalNum * t;

    // Com juros compostos (investimento recorrente)
    let montanteR = 0;
    for (let j = 1; j <= t; j++) {
      montanteR = montanteR + montanteR * i + mensalNum;
    }

    setResultado(
      `Montante sem juros: R$ ${montanteS.toFixed(2)}\n` +
      `Montante com juros: R$ ${montanteR.toFixed(2)}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Investimento</Text>

      <TextInput
        placeholder="Valor mensal investido (R$)"
        style={styles.input}
        keyboardType="numeric"
        value={mensal}
        onChangeText={setMensal}
      />
      <TextInput
        placeholder="Número de meses"
        style={styles.input}
        keyboardType="numeric"
        value={meses}
        onChangeText={setMeses}
      />
      <TextInput
        placeholder="Taxa de juros mensal (%)"
        style={styles.input}
        keyboardType="numeric"
        value={jurosMensal}
        onChangeText={setJurosMensal}
      />

      <Button title="Calcular" onPress={calcularInvestimento} />
      <Text style={styles.text}>{resultado}</Text>
    </View>
  );
}
