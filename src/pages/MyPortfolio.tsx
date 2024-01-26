import { useState, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface Investment {
  id: number;
  initialCapital: number;
  annualRate: number;
  timeToInvest: number;
  frequency: string;
  additionalInvestment: number;
}

const MyPortfolio = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [formValues, setFormValues] = useState<Investment>({
    id: 0,
    initialCapital: 0,
    annualRate: 0,
    timeToInvest: 0,
    frequency: "",
    additionalInvestment: 0,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: parseFloat(value), // Parse input value to number
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
      { ...formValues, id: prevInvestments.length + 1 },
    ]);
    setFormValues({
      id: 0,
      initialCapital: 0,
      annualRate: 0,
      timeToInvest: 0,
      frequency: "",
      additionalInvestment: 0,
    });
  }, [formValues]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }, []);

  const getFrequencyMultiplier = (_frequency: string) => {
    if (_frequency === "daily") {
      return 365;
    } else if (_frequency === "weekly") {
      return 52;
    } else if (_frequency === "monthly") {
      return 12;
    } else if (_frequency === "yearly") {
      return 1;
    }
    return 1;
  };

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
    <Box p={4}>
      <Flex flexDir="column">
        <FormControl mb={4}>
          <FormLabel>Initial Capital</FormLabel>
          <Input
            type="number"
            name="initialCapital"
            value={formValues.initialCapital}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Annual Rate</FormLabel>
          <Input
            type="number"
            name="annualRate"
            value={formValues.annualRate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Time to Invest (years)</FormLabel>
          <Input
            type="number"
            name="timeToInvest"
            value={formValues.timeToInvest}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Frequency</FormLabel>
          <Select
            name="frequency"
            value={formValues.frequency}
            onChange={handleSelectChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </Select>
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Additional Investment</FormLabel>
          <Input
            type="number"
            name="additionalInvestment"
            onChange={handleInputChange}
            value={formValues.additionalInvestment}
          />
        </FormControl>
        <Button mb={4} onClick={handleAddInvestment}>
          Add Investment
        </Button>
      </Flex>
      {investments.length > 0 && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Investment ID</Th>
              <Th>Initial Capital</Th>
              <Th>Annual Rate</Th>
              <Th>Time to Invest (years)</Th>
              <Th>Frequency</Th>
              <Th>Additional Investment</Th>
              <Th>Projected Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {investments.map((investment) => (
              <Tr key={investment.id}>
                <Td>{investment.id}</Td>
                <Td>{formatCurrency(investment.initialCapital)}</Td>
                <Td>{investment.annualRate}%</Td>
                <Td>{investment.timeToInvest}</Td>
                <Td>{investment.frequency}</Td>
                <Td>
                  {formatCurrency(
                    investment.additionalInvestment *
                      investment.timeToInvest *
                      getFrequencyMultiplier(investment.frequency)
                  )}
                </Td>
                <Td>
                  {formatCurrency(
                    investment.initialCapital +
                      investment.additionalInvestment *
                        investment.timeToInvest *
                        getFrequencyMultiplier(investment.frequency) +
                      (investment.initialCapital +
                        investment.additionalInvestment *
                          investment.timeToInvest *
                          getFrequencyMultiplier(investment.frequency)) *
                        Math.pow(
                          1 + investment.annualRate / 100,
                          investment.timeToInvest
                        )
                  )}
                </Td>{" "}
                {/* New column */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {investments.length > 0 && (
        <>
          <Text>Total Investment: {calculateTotalInvestment}</Text>
          <Text>Total Projected: {calculateTotalProjected}</Text>
          <Text>Total Rate: {calculateTotalRate}</Text>
          <Text>
            Total Additional Investment: {calculateTotalAdditionalInvestment}
          </Text>
          <Text>Real Total Rate: {calculateRealTotalRate}</Text>
        </>
      )}
    </Box>
  );
};

export default MyPortfolio;
