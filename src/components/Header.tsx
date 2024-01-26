import { Flex, Heading, Box } from "@chakra-ui/react";

function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1.5rem"
      bg="blue.500"
      color="white"
    >
      <Heading size="lg">Calculadoras de finanzass</Heading>
    </Flex>
  );
}

export default Header;
