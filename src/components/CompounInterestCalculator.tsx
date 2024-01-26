import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Flex,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import {
  FaDollarSign,
  FaMoneyBillWave,
  FaChartLine,
  FaCoins,
  FaCalendarAlt,
} from "react-icons/fa"; // Added new icons
import ResultCard from "./ResultCard";
import DataGraph from "./DataGraph";

export interface InvestmentGrowthData {
  year: number;
  initDeposit: number;
  accumulatedDeposits: number;
  accumulatedInterest: number;
  total: number;
}

const FORMAT = (val: string) => val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const DEFAULT_RATE = 10;
const DEFAULT_YEARS = 5;
const DEFAULT_FREQUENCY = "annually";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [rate, setRate] = useState<number>(DEFAULT_RATE);
  const [years, setYears] = useState<number>(DEFAULT_YEARS);
  const [investmentGrowth, setInvestmentGrowth] = useState<
    InvestmentGrowthData[]
  >([]);
  const [frequency, setFrequency] = useState<string>(DEFAULT_FREQUENCY);
  const [additionals, setAdditionals] = useState<number>(0);

  const calculateCompoundInterest = () => {
    setInvestmentGrowth([]);
    const growthData: InvestmentGrowthData[] = [];
    let amount = principal;
    let accumulatedDeposits = 0;
    let accumulatedInterest = 0;
    const periodMultiplier = getFrequencyMultiplier(frequency);
    const adjustedRate = rate / (100 * periodMultiplier);

    for (let i = 0; i < years * periodMultiplier; i++) {
      const interest = amount * adjustedRate;
      accumulatedInterest += interest;
      amount += interest;

      accumulatedDeposits += additionals;
      amount += additionals;

      const total = parseInt(amount.toFixed(2));
      if ((i + 1) % periodMultiplier === 0) {
        growthData.push({
          year: i + 1,
          initDeposit: principal,
          accumulatedDeposits: parseFloat(accumulatedDeposits.toFixed(2)),
          accumulatedInterest: parseFloat(accumulatedInterest.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
        });
      }
    }
    setInvestmentGrowth(growthData);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, years, frequency, additionals]);

  const getFrequencyMultiplier = (frequency: string) => {
    switch (frequency) {
      case "monthly":
        return 12;
      case DEFAULT_FREQUENCY:
      default:
        return 1;
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex>
        <VStack spacing={4} width="30%">
          <FormControl id="principal">
            <FormLabel>Inversión inicial</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<FaDollarSign />}
              />
              <NumberInput
                min={0}
                onChange={(valueString) => setPrincipal(parseInt(valueString))}
                value={FORMAT(principal.toString())}
                onFocus={(e) => e.target.select()}
                w="100%"
              >
                <NumberInputField
                  placeholder="Inversión inicial"
                  borderLeftRadius={0}
                />
              </NumberInput>
            </InputGroup>
          </FormControl>
          <FormControl id="rate">
            <FormLabel>Interés anual (%)</FormLabel>
            <NumberInput
              min={0}
              max={100}
              onChange={(valueString) => setRate(parseFloat(valueString))}
              defaultValue={rate}
            >
              <NumberInputField placeholder="Interés anual" />
            </NumberInput>
          </FormControl>
          <FormControl id="years">
            <FormLabel>Plazo (Años)</FormLabel>
            <NumberInput
              min={0}
              max={100}
              onChange={(valueString) => {
                const value = parseFloat(valueString);
                setYears(value > 100 ? 100 : value);
              }}
              defaultValue={years}
            >
              <NumberInputField placeholder="Plazo de crédito" value={years} />
            </NumberInput>
          </FormControl>
          <FormControl id="frequency">
            <FormLabel>Frecuencia de interés</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<FaCalendarAlt />}
              />
              <Select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                borderLeftRadius={0}
              >
                <option value={DEFAULT_FREQUENCY}>Anualmente</option>
                <option value="monthly">Mensualmente</option>
              </Select>
            </InputGroup>
          </FormControl>
          <FormControl id="additionals">
            <FormLabel>Aportes adicionales</FormLabel>
            <InputGroup>
              <InputLeftAddon
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<FaDollarSign />}
              />
              <NumberInput
                min={0}
                onChange={(valueString) =>
                  setAdditionals(parseFloat(valueString))
                }
                w="100%"
              >
                <NumberInputField
                  placeholder="Aportes adicionales"
                  borderLeftRadius={0}
                />
              </NumberInput>
            </InputGroup>
          </FormControl>
        </VStack>
        <VStack width="70%">
          <Flex justifyContent="center" alignItems="center" width="100%">
            <DataGraph growthData={investmentGrowth} />
          </Flex>
          <Flex justifyContent="space-between" maxWidth={980} width="100%">
            <ResultCard
              label="Inversión inicial"
              value={FORMAT(principal.toString())}
              icon={FaDollarSign}
            />
            <ResultCard
              label="Depósitos adicionales"
              value={FORMAT(
                investmentGrowth[
                  investmentGrowth.length - 1
                ]?.accumulatedDeposits?.toString() || "0"
              )}
              icon={FaMoneyBillWave}
            />
            <ResultCard
              label="Interés acumulado"
              value={FORMAT(
                investmentGrowth[
                  investmentGrowth.length - 1
                ]?.accumulatedInterest?.toString() || "0"
              )}
              icon={FaChartLine}
            />
            <ResultCard
              label="Total"
              value={FORMAT(
                investmentGrowth[
                  investmentGrowth.length - 1
                ]?.total?.toString() || "0"
              )}
              icon={FaCoins}
            />
          </Flex>
          <Flex overflowX="auto">
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
                    <Td>${FORMAT(data.initDeposit.toString())}</Td>
                    <Td>
                      ${FORMAT(data.accumulatedDeposits.toFixed(2).toString())}
                    </Td>
                    <Td>
                      ${FORMAT(data.accumulatedInterest.toFixed(2).toString())}
                    </Td>
                    <Td>${FORMAT(data.total.toFixed(2).toString())}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default CompoundInterestCalculator;
