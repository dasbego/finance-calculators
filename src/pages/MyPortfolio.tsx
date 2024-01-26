import React, { useState, useCallback, useMemo } from "react";
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
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  FaDollarSign,
  FaPercentage,
  FaCalendarAlt,
  FaTrash,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface Investment {
  id: string;
  initialCapital: number;
  annualRate: number;
  timeToInvest: number;
  frequency: string;
  additionalInvestment: number;
}

const DEFAULT_FORM_VALUES: Investment = {
  id: "",
  initialCapital: 0,
  annualRate: 0,
  timeToInvest: 0,
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
  handleInputChange: (name: keyof Investment, value: number) => void;
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
    <Flex flexDir="column">
      <FormControl id="initialCapital">
        <FormLabel>Inversión inicial</FormLabel>
        <InputGroup>
          <InputLeftAddon
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<FaDollarSign />}
          />
          <NumberInput
            name="initialCapital"
            value={formValues.initialCapital}
            onChange={(value) =>
              handleInputChange("initialCapital", parseFloat(value) || 0)
            }
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
            children={<FaPercentage />}
          />
          <NumberInput
            name="annualRate"
            value={formValues.annualRate}
            onChange={(value) =>
              handleInputChange("annualRate", parseFloat(value) || 0)
            }
          >
            <NumberInputField borderLeftRadius={0} />
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
            children={<FaCalendarAlt />}
          />
          <NumberInput
            min={1}
            name="timeToInvest"
            value={formValues.timeToInvest}
            onChange={(value) =>
              handleInputChange("timeToInvest", parseFloat(value) || 0)
            }
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
            children={<FaCalendarAlt />}
          />
          <Select
            name="frequency"
            value={formValues.frequency}
            onChange={handleSelectChange}
            borderLeftRadius={0}
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
            children={<FaDollarSign />}
          />
          <NumberInput
            name="additionalInvestment"
            value={formValues.additionalInvestment}
            onChange={(value) =>
              handleInputChange("additionalInvestment", parseFloat(value) || 0)
            }
          >
            <NumberInputField borderLeftRadius={0} />
          </NumberInput>
        </InputGroup>
      </FormControl>
      <Button mb={4} onClick={handleAddInvestment}>
        Agregar Inversión
      </Button>
    </Flex>
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
  const calculateTotalInvestment = useMemo(() => {
    const totalInvestment = investments.reduce(
      (total, investment) =>
        total + investment.initialCapital + investment.additionalInvestment,
      0
    );
    return formatCurrency(totalInvestment);
  }, [investments]);

  const calculateTotalProjected = useMemo(() => {
    const totalProjected = investments.reduce((total, investment) => {
      const frequencyMultiplier = getFrequencyMultiplier(investment.frequency);
      const additionalInvestment =
        investment.additionalInvestment *
        frequencyMultiplier *
        investment.timeToInvest;
      const projectedValue =
        investment.initialCapital +
        additionalInvestment +
        (investment.initialCapital + additionalInvestment) *
          Math.pow(1 + investment.annualRate / 100, investment.timeToInvest);
      return total + projectedValue;
    }, 0);
    return formatCurrency(totalProjected);
  }, [investments]);

  const calculateTotalRate = useMemo(() => {
    const totalRate = investments.reduce(
      (total, investment) => total + investment.annualRate,
      0
    );
    return totalRate.toFixed(2) + "%";
  }, [investments]);

  const calculateTotalAdditionalInvestment = useMemo(() => {
    const totalAdditionalInvestment = investments.reduce(
      (total, investment) => {
        const frequencyMultiplier = getFrequencyMultiplier(
          investment.frequency
        );
        const additionalInvestment =
          investment.additionalInvestment *
          frequencyMultiplier *
          investment.timeToInvest;
        return total + additionalInvestment;
      },
      0
    );
    return formatCurrency(totalAdditionalInvestment);
  }, [investments]);

  const calculateRealTotalRate = useMemo(() => {
    const totalInvestment = investments.reduce(
      (total, investment) =>
        total + investment.initialCapital + investment.additionalInvestment,
      0
    );
    const totalProjected = investments.reduce((total, investment) => {
      const frequencyMultiplier = getFrequencyMultiplier(investment.frequency);
      const additionalInvestment =
        investment.additionalInvestment *
        frequencyMultiplier *
        investment.timeToInvest;
      const projectedValue =
        investment.initialCapital +
        additionalInvestment +
        (investment.initialCapital + additionalInvestment) *
          Math.pow(1 + investment.annualRate / 100, investment.timeToInvest);
      return total + projectedValue;
    }, 0);
    const totalInterest = totalProjected - totalInvestment;
    const realTotalRate = (totalInterest / totalInvestment) * 100;
    return realTotalRate.toFixed(2) + "%";
  }, [investments]);

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID de Inversión</Th>
            <Th>Capital Inicial</Th>
            <Th>Tasa Anual</Th>
            <Th>Tiempo de Inversión (años)</Th>
            <Th>Frecuencia</Th>
            <Th>Inversión Adicional Total</Th>
            <Th>Valor Proyectado</Th>
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

            const frequencyMultiplier = getFrequencyMultiplier(frequency);
            const totalAdditionalInvestment =
              additionalInvestment * timeToInvest * frequencyMultiplier;
            const compoundInterestInitialCapital =
              initialCapital * Math.pow(1 + annualRate / 100, timeToInvest);
            const compoundInterestAdditional =
              totalAdditionalInvestment *
              Math.pow(1 + annualRate / 100, timeToInvest);
            const totalInvestment =
              compoundInterestInitialCapital + compoundInterestAdditional;

            return (
              <Tr key={id}>
                <Td>{id}</Td>
                <Td>{formatCurrency(initialCapital)}</Td>
                <Td>{annualRate}%</Td>
                <Td>{timeToInvest}</Td>
                <Td>{frequency}</Td>
                <Td>{formatCurrency(totalAdditionalInvestment)}</Td>
                <Td>{formatCurrency(totalInvestment)}</Td>
                <Td>
                  <IconButton
                    aria-label="Delete investment"
                    icon={<FaTrash />}
                    colorScheme="red"
                    onClick={() => handleDeleteInvestment(id)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Text>Inversión Total: {calculateTotalInvestment}</Text>
      <Text>Proyección Total: {calculateTotalProjected}</Text>
      <Text>Tasa Total: {calculateTotalRate}</Text>
      <Text>
        Inversión Adicional Total: {calculateTotalAdditionalInvestment}
      </Text>
      <Text>Tasa Total Real: {calculateRealTotalRate}</Text>
    </>
  );
};

const MyPortfolio = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [formValues, setFormValues] = useState<Investment>(DEFAULT_FORM_VALUES);

  const handleInputChange = useCallback(
    (name: keyof Investment, value: number) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: parseFloat(value),
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

  const handleAddInvestment = useCallback(() => {
    setInvestments((prevInvestments) => [
      ...prevInvestments,
      { ...formValues, id: uuidv4() },
    ]);
    setFormValues({
      ...DEFAULT_FORM_VALUES,
      id: "",
    });
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
    <Box p={4}>
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
    </Box>
  );
};

export default MyPortfolio;
