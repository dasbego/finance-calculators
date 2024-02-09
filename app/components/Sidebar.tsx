import React from "react";
import { Box, Link, VStack } from "@chakra-ui/react";

const Sidebar: React.FC = () => {
  return (
    <aside>
      <VStack alignItems="flex-start">
        <Box>
          <Link fontWeight="bold" href="/simulators">
            Simuladores de créditos
          </Link>
        </Box>
        <Box fontWeight="bold">
          <Link href="/portfolio">Mi portafolio de inversiones</Link>
        </Box>
        <Box fontWeight="bold">
          <Link href="/alarms">Mis alarmas</Link>
        </Box>
        <Box fontWeight="bold">
          <Link href="/calendar">Calendario de pagos</Link>
        </Box>
      </VStack>
    </aside>
  );
};

export default Sidebar;
