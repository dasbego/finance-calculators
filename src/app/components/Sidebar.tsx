import React from "react";
import { Box, Link, VStack } from "@chakra-ui/react";

const Sidebar: React.FC = () => {
  return (
    <aside>
      <VStack alignItems="flex-start">
        <Box>
          <Link fontWeight="bold" href="/simuladores">
            Simuladores de créditos
          </Link>
        </Box>
        <Box fontWeight="bold">
          <Link>Mi portafolio de inversiones</Link>
        </Box>
        <Box fontWeight="bold">
          <Link>Mis alarmas</Link>
        </Box>
      </VStack>
    </aside>
  );
};

export default Sidebar;
