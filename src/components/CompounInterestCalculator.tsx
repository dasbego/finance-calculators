import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  NumberInput,
  NumberInputField,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const format = (val: string) => val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [years, setYears] = useState<number>(0);
  const [result, setResult] = useState<string>("0");
  const [investmentGrowth, setInvestmentGrowth] = useState<
    { year: number; amount: number }[]
  >([]);

  const calculateCompoundInterest = () => {
    const growthData: { year: number; amount: number }[] = [];
    let amount = principal;
    for (let i = 0; i < years; i++) {
      const year = i + 1;
      const interest = amount * (rate / 100);
      amount += interest;
      growthData.push({ year, amount: parseInt(amount.toFixed(2)) });
    }
    setInvestmentGrowth(growthData);
    const formattedResult = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    setResult(formattedResult);
  };

  return (
    <Box p={4} maxW="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <VStack spacing={4}>
        <FormControl id="principal">
          <FormLabel>Inversión inicial</FormLabel>
          <NumberInput
            min={0}
            onChange={(valueString) => setPrincipal(parseInt(valueString))}
            value={format(principal.toString())}
            onFocus={(e) => e.target.select()}
          >
            <NumberInputField placeholder="Inversión inicial" />
          </NumberInput>
        </FormControl>
        <FormControl id="rate">
          <FormLabel>Interés anual (%)</FormLabel>
          <NumberInput
            min={0}
            max={100}
            onChange={(valueString) => setRate(parseFloat(valueString))}
          >
            <NumberInputField placeholder="Interés anual" />
          </NumberInput>
        </FormControl>
        <FormControl id="years">
          <FormLabel>Plazo (Años)</FormLabel>
          <NumberInput
            min={0}
            onChange={(valueString) => setYears(parseFloat(valueString))}
          >
            <NumberInputField placeholder="Plazo de crédito" />
          </NumberInput>
        </FormControl>
        <Button colorScheme="blue" onClick={calculateCompoundInterest}>
          Calcular
        </Button>
        {result && (
          <>
            <Text fontSize="xl">
              Inversión inicial: {format(principal.toString())}
            </Text>
            <Text fontSize="xl">Valor futuro: {result}</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Año</Th>
                  <Th>Valor Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {investmentGrowth.map((data) => (
                  <Tr key={data.year}>
                    <Td>{data.year}</Td>
                    <Td>${format(data.amount.toString())}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default CompoundInterestCalculator;
