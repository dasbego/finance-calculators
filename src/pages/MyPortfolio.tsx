import { useState } from "react";
import {
  Box,
  Button,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: parseFloat(value), // Parse input value to number
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddInvestment = () => {
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
  };

  const calculateTotalInvestment = () => {
    const totalInvestment = investments.reduce(
      (total, investment) => total + investment.initialCapital,
      0
    );
    return formatCurrency(totalInvestment);
  };

  const calculateTotalProjected = () => {
    const totalProjected = investments.reduce((total, investment) => {
      const projectedValue =
        investment.initialCapital *
        Math.pow(1 + investment.annualRate / 100, investment.timeToInvest);
      return total + projectedValue;
    }, 0);
    return formatCurrency(totalProjected);
  };

  const calculateTotalRate = () => {
    const totalRate = investments.reduce(
      (total, investment) => total + investment.annualRate,
      0
    );
    debugger;
    return totalRate.toFixed(2) + "%";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <Box p={4}>
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
                <Td>{investment.additionalInvestment ? "Yes" : "No"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {investments.length > 0 && (
        <>
          <Text>Total Investment: {calculateTotalInvestment()}</Text>
          <Text>Total Projected: {calculateTotalProjected()}</Text>
          <Text>Total Rate: {calculateTotalRate()}</Text>
        </>
      )}
    </Box>
  );
};

export default MyPortfolio;
