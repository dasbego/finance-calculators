import { Box } from "@chakra-ui/react";
import CompoundInterestCalculator from "./CompounInterestCalculator";
import MyPortfolio from "../pages/MyPortfolio";

function Body() {
  return (
    <Box
      as="main"
      flex="1" // Flex grow to take available space
      flexDir="column"
      p={{ base: "2", md: "4" }} // Padding: 2 on base (small screens), 4 on medium screens and up
      width={{ base: "full", md: "auto" }} // Full width on small screens, auto on medium screens and up
    >
      {/*<CompoundInterestCalculator />*/}
      <MyPortfolio />
    </Box>
  );
}

export default Body;
