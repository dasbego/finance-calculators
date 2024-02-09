import React from "react";
import { Box } from "@chakra-ui/react";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";

const Simulators: React.FC = () => {
  return (
    <Box padding={4}>
      <CompoundInterestCalculator />
    </Box>
  );
};

export default Simulators;
