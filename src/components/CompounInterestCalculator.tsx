import React, { useState, useEffect } from "react";
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
  Select, // Added Select component
} from "@chakra-ui/react";

const format = (val: string) => val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(10); // Added default value of 10
  const [years, setYears] = useState<number>(10); // Added default value of 10
  const [result, setResult] = useState<string>("0");
  const [investmentGrowth, setInvestmentGrowth] = useState<
    {
      year: number;
      initDeposit: number;
      accumulatedDeposits: number;
      accumulatedInterest: number;
      total: number;
    }[]
  >([]);
  const [frequency, setFrequency] = useState<string>("annually"); // Changed frequency state to string
  const [additionals, setAdditionals] = useState<number>(0);

  const calculateCompoundInterest = () => {
    const growthData: {
      year: number;
      initDeposit: number;
      accumulatedDeposits: number;
      accumulatedInterest: number;
      total: number;
    }[] = [];
    let amount = principal;
    let accumulatedDeposits = 0; // Added accumulatedDeposits variable
    let accumulatedInterest = 0; // Added accumulatedInterest variable
    for (let i = 0; i < years; i++) {
      const yearPrincipal = i === 0 ? 0 : growthData[i - 1].total;
      const year = i + 1;
      const interest = amount * (rate / 100);
      accumulatedInterest += interest; // Updated accumulatedInterest
      amount += interest;
      accumulatedDeposits += additionals; // Updated accumulatedDeposits
      amount += accumulatedDeposits * getFrequencyMultiplier(frequency); // Adjusted calculation based on frequency
      const total = parseInt(amount.toFixed(2));
      growthData.push({
        year,
        initDeposit: principal,
        accumulatedDeposits,
        accumulatedInterest,
        total,
      });
    }
    setInvestmentGrowth(growthData);
    const formattedResult = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
    setResult(formattedResult);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, years, frequency, additionals]);

  const getFrequencyMultiplier = (frequency: string) => {
    switch (frequency) {
      case "annually":
        return 1;
      case "monthly":
        return 12;
      case "weekly":
        return 52;
      case "daily":
        return 365;
      default:
        return 1;
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
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
            <NumberInputField placeholder="Plazo de crédito" value={years} />
          </NumberInput>
        </FormControl>
        <FormControl id="frequency">
          <FormLabel>Frecuencia de interés</FormLabel>
          <Select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="annually">Anualmente</option>
            <option value="monthly">Mensualmente</option>
            <option value="weekly">Semanalmente</option>
            <option value="daily">Diariamente</option>
          </Select>
        </FormControl>
        <FormControl id="additionals">
          <FormLabel>Aportes adicionales</FormLabel>
          <NumberInput
            min={0}
            onChange={(valueString) => setAdditionals(parseFloat(valueString))}
            placeholder="Aportes adicionales" // Added placeholder
          >
            <NumberInputField placeholder="Aportes adicionales" />
          </NumberInput>
        </FormControl>
        {/* Removed Calculate button */}
        {result && (
          <>
            <Text fontSize="xl">
              Inversión inicial: {format(principal.toString())}
            </Text>
            <Text fontSize="xl">Valor futuro: {result}</Text>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Año</Th>
                    <Th>Depósito Inicial</Th>
                    <Th>Depósitos Acumulados</Th>
                    <Th>Interés Acumulado</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {investmentGrowth.map((data) => (
                    <Tr key={data.year}>
                      <Td>{data.year}</Td>
                      <Td>${format(data.initDeposit.toString())}</Td>
                      <Td>${format(data.accumulatedDeposits.toString())}</Td>
                      <Td>${format(data.accumulatedInterest.toString())}</Td>
                      <Td>${format(data.total.toString())}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default CompoundInterestCalculator;
