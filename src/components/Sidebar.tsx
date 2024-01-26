import { Box, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box as="aside" w="250px" p="4" bg="gray.100">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Menu
      </Text>
      <Stack spacing="3">
        {/* Add your navigation links here */}
        <Link as={RouterLink} to="/">
          Calculadora de Interés Compuesto
        </Link>
        <Link as={RouterLink} to="/myportfolio">
          Mi portafolio de inversiones
        </Link>
      </Stack>
    </Box>
  );
}

export default Sidebar;
