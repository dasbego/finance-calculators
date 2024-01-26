import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface CardComponentProps {
  label: string;
  value: string;
  icon: React.ElementType; // Updated prop type
  width?: number | string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  label,
  value,
  icon: Icon,
  width = "200px",
}) => {
  return (
    <Box
      width={width} // Added width prop
      maxWidth={200}
      justifyContent="center"
      alignItems="center"
      border="1px solid black" // BEGIN: Added border style
      borderRadius={4} // Added border radius
      display="flex"
      flexDirection="column"
    >
      <Box padding={5} maxHeight={200}>
        <Box marginBottom={10} flex="1">
          <Text
            fontSize={16}
            fontWeight="bold"
            maxH="3em"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {label}
          </Text>
        </Box>
        <Box marginBottom={10} flex="1" display="flex" justifyContent="center">
          <Icon size="60" color="gray" />
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        backgroundColor="ButtonHighlight"
        justifyContent="center"
        alignItems="center"
        fontSize={20}
        width="100%"
        height={50}
      >
        <Text color="black" fontWeight="bold">
          ${value}
        </Text>
      </Box>
    </Box>
  );
};

export default CardComponent;
