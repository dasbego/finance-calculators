import {
  Box,
  Stack,
  Text,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import "./Sidebar.css";

function Sidebar() {
  // @ts-ignore
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <Box as="aside" p="4" bg="gray.100" id="sidebar">
        <IconButton
          aria-label="Open menu"
          icon={<AiOutlineMenu />}
          onClick={onOpen}
          size="md"
          alignSelf="flex-end"
          mr="4"
          mt="4"
        />
      </Box>
    );
  }

  return (
    <Box as="aside" w="250px" p="4" bg="gray.100" id="sidebar">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Menu
      </Text>
      <Stack spacing="4">
        {/* Add your navigation links here */}
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Calculadora de Interés Compuesto
        </NavLink>
        <NavLink
          to="/myportfolio"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Mi portafolio de inversiones
        </NavLink>
      </Stack>
    </Box>
  );
}

export default Sidebar;
