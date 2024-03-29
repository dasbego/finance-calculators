"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Grid,
  Heading,
  IconButton,
  Input,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  FaDollarSign,
  FaPercentage,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

interface Investment {
  id: string;
  name: string;
  initialCapital: number;
  annualRate: number;
  timeToInvest: number;
  frequency: string;
  additionalInvestment: number;
}

const DEFAULT_FORM_VALUES: Investment = {
  id: "",
  name: "Mi nueva inversion",
  initialCapital: 0,
  annualRate: 7.0,
  timeToInvest: 1,
  frequency: "yearly",
  additionalInvestment: 0,
};

const getFrequencyMultiplier = (frequency: string) => {
  switch (frequency) {
    case "daily":
      return 365;
    case "weekly":
      return 52;
    case "monthly":
      return 12;
    case "yearly":
      return 1;
    default:
      return 1;
  }
};

interface FormComponentProps {
  formValues: Investment;
  handleInputChange: (name: keyof Investment, value: number | string) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddInvestment: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  formValues,
  handleInputChange,
  handleSelectChange,
  handleAddInvestment,
}) => {
  return (
    <>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={1}
      >
        <FormControl id="name">
          <FormLabel>Nombre de la inversión</FormLabel>
          <Input
            name="name"
            value={formValues.name}
            onChange={(event) => handleInputChange("name", event.target.value)}
          />
        </FormControl>
        <FormControl id="initialCapital">
          <FormLabel>Inversión inicial</FormLabel>
          <InputGroup>
            <InputLeftAddon
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <FaDollarSign />
            </InputLeftAddon>
            <NumberInput
              name="initialCapital"
              value={formValues.initialCapital}
              onChange={(value) =>
                handleInputChange("initialCapital", parseFloat(value) || 0)
              }
              width="100%"
            >
              <NumberInputField borderLeftRadius={0} />
            </NumberInput>
          </InputGroup>
        </FormControl>

        <FormControl id="annualRate">
          <FormLabel>Tasa anual</FormLabel>
          <InputGroup>
            <InputLeftAddon
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <FaPercentage />
            </InputLeftAddon>
            <NumberInput
              name="annualRate"
              value={formValues.annualRate}
              min={0.1}
              precision={2}
              step={0.1}
              onChange={(value) => {
                handleInputChange("annualRate", parseFloat(value) || 0);
              }}
              inputMode="decimal"
              width="100%"
            >
              <NumberInputField borderLeftRadius={0} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
        </FormControl>
        <FormControl id="timeToInvest">
          <FormLabel>Tiempo para invertir (años)</FormLabel>
          <InputGroup>
            <InputLeftAddon
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <FaCalendarAlt />
            </InputLeftAddon>
            <NumberInput
              min={1}
              name="timeToInvest"
              value={formValues.timeToInvest}
              onChange={(value) =>
                handleInputChange("timeToInvest", parseFloat(value) || 0)
              }
              width="100%"
            >
              <NumberInputField borderLeftRadius={0} />
            </NumberInput>
          </InputGroup>
        </FormControl>

        <FormControl mb={4} id="frequency">
          <FormLabel>Frecuencia</FormLabel>
          <InputGroup>
            <InputLeftAddon
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <FaCalendarAlt />
            </InputLeftAddon>
            <Select
              name="frequency"
              value={formValues.frequency}
              onChange={handleSelectChange}
              borderLeftRadius={0}
              width="100%"
            >
              <option value="daily">Diario</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="yearly">Anual</option>
            </Select>
          </InputGroup>
        </FormControl>
        <FormControl mb={4} id="additionalInvestments">
          <FormLabel>Inversión Adicional</FormLabel>
          <InputGroup>
            <InputLeftAddon
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              <FaDollarSign />
            </InputLeftAddon>
            <NumberInput
              name="additionalInvestment"
              value={formValues.additionalInvestment}
              onChange={(value) =>
                handleInputChange(
                  "additionalInvestment",
                  parseFloat(value) || 0
                )
              }
              width="100%"
            >
              <NumberInputField borderLeftRadius={0} />
            </NumberInput>
          </InputGroup>
        </FormControl>
        <Flex justifyContent="center" alignItems="center">
          <Button onClick={handleAddInvestment} size="lg" colorScheme="green">
            Agregar Inversión
          </Button>
        </Flex>
      </Grid>
    </>
  );
};

interface TableComponentProps {
  investments: Investment[];
  handleDeleteInvestment: (id: string) => void;
  formatCurrency: (value: number) => string;
}

const TableComponent: React.FC<TableComponentProps> = ({
  investments,
  handleDeleteInvestment,
  formatCurrency,
}) => {
  // Calculate total investment
  const totalInvestment = investments.reduce((total, investment) => {
    const frequencyMultiplier = getFrequencyMultiplier(investment.frequency);
    const totalAdditionalInvestment =
      investment.additionalInvestment *
      investment.timeToInvest *
      frequencyMultiplier;
    return total + investment.initialCapital + totalAdditionalInvestment;
  }, 0);

  // Calculate total return
  const totalReturn = investments.reduce((total, investment) => {
    const frequencyMultiplier = getFrequencyMultiplier(investment.frequency);
    const adjustedRate = investment.annualRate / (100 * frequencyMultiplier);
    let amount = investment.initialCapital;
    let accumulatedInterest = 0;

    for (let i = 0; i < investment.timeToInvest * frequencyMultiplier; i++) {
      const interest = amount * adjustedRate;
      accumulatedInterest += interest;
      amount += interest + investment.additionalInvestment;
    }

    return total + accumulatedInterest;
  }, 0);

  // Calculate total profit
  const totalProfit = totalReturn + totalInvestment;

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>ID de Inversión</Th>
            <Th>Capital Inicial</Th>
            <Th>Tasa Anual</Th>
            <Th>Tiempo de Inversión (años)</Th>
            <Th>Frecuencia</Th>
            <Th>Inversión Adicional Total</Th>
            <Th>Interés total generado</Th>
            <Th>Valor Proyectado</Th>
            <Th>Eliminar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {investments.map((investment) => {
            const {
              id,
              initialCapital,
              annualRate,
              timeToInvest,
              frequency,
              additionalInvestment,
            } = investment;
            // Calculate the frequency multiplier
            const frequencyMultiplier = getFrequencyMultiplier(frequency);

            // Adjusted rate
            const adjustedRate = annualRate / (100 * frequencyMultiplier);

            let amount = initialCapital;
            let accumulatedDeposits = 0;
            let accumulatedInterest = 0;

            for (let i = 0; i < timeToInvest * frequencyMultiplier; i++) {
              const interest = amount * adjustedRate;
              accumulatedInterest += interest;
              amount += interest;

              accumulatedDeposits += additionalInvestment;
              amount += additionalInvestment;
            }

            const totalInvestment = parseFloat(amount.toFixed(2));

            return (
              <Tr key={id}>
                <Td>{investment.name}</Td>
                <Td>{id}</Td>
                <Td>{formatCurrency(initialCapital)}</Td>
                <Td>{annualRate}%</Td>
                <Td>{timeToInvest}</Td>
                <Td>{frequency}</Td>
                <Td>{formatCurrency(accumulatedDeposits)}</Td>
                <Td>{formatCurrency(accumulatedInterest)}</Td>
                <Td>{formatCurrency(totalInvestment)}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete Investment"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteInvestment(id)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box p={4} bg="gray.100">
        <Heading as="h2" size="lg">
          Total
        </Heading>
        <Text fontSize="xl">
          <b>Inversion Total:</b> {formatCurrency(totalInvestment)}
        </Text>
        <Text fontSize="xl">
          <b>Total de intereses generados:</b> {formatCurrency(totalReturn)}
        </Text>
        <Text fontSize="xl">
          <b>Total:</b> {formatCurrency(totalProfit)}
        </Text>
      </Box>
    </Box>
  );
};

const MyPortfolio = () => {
  const [persistedInvestments, setPersistedInvestments] = useLocalStorage<
    Investment[]
  >("investments", []);
  const [investments, setInvestments] = useState<Investment[]>(() => {
    return persistedInvestments || [];
  });
  const [formValues, setFormValues] = useState<Investment>(DEFAULT_FORM_VALUES);

  // Load investments from local storage when component mounts
  useEffect(() => {
    const savedInvestments = localStorage.getItem("investments");
    if (savedInvestments) {
      setInvestments(JSON.parse(savedInvestments));
    }
  }, []);

  // Save investments to local storage whenever they change
  useEffect(() => {
    setPersistedInvestments(investments);
  }, [investments]);

  const handleInputChange = useCallback(
    (name: keyof Investment, value: number | string) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        // @ts-ignore
        [name]: typeof value === "number" ? parseFloat(value) : value,
      }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const resetFormValues = useCallback(() => {
    setFormValues({
      ...DEFAULT_FORM_VALUES,
      id: "",
    });
  }, []);

  const handleAddInvestment = useCallback(() => {
    const newInvestment = { ...formValues, id: uuidv4() };
    setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
    // Reset form values
    resetFormValues();
  }, [formValues]);

  const handleDeleteInvestment = useCallback(
    (id: string) => {
      setInvestments(
        investments.filter((investment) => {
          return investment.id !== id;
        })
      );
    },
    [investments]
  );

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }, []);

  return (
    <>
      <FormComponent
        formValues={formValues}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleAddInvestment={handleAddInvestment}
      />
      {investments.length > 0 && (
        <TableComponent
          investments={investments}
          handleDeleteInvestment={handleDeleteInvestment}
          formatCurrency={formatCurrency}
        />
      )}
    </>
  );
};

export default MyPortfolio;
