import {
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  FaGripVertical,
  FaPlusCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Header() {
  const isMobile = useBreakpointValue({ base: true, md: false });

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

      {isMobile && (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="options"
            icon={<FaGripVertical />}
            display={{ base: "block", md: "none" }}
            size="6"
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "blue.200" }}
            _expanded={{ bg: "blue.400" }}
            _active={{ bg: "blue.200" }}
            _focus={{ boxShadow: "outline" }}
          />
          <MenuList color="black">
            <MenuItem as={NavLink} to="/" icon={<FaPlusCircle />} command="⌘T">
              <Text>Calculadora de interés compuesto</Text>
            </MenuItem>
            <MenuItem
              as={NavLink}
              to="/myportfolio"
              icon={<FaExternalLinkAlt />}
              command="⌘N"
            >
              <Text>Mi portafolio de inversiones</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}

export default Header;
