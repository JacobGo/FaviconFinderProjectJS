import { Box, Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import { FetchMetadata } from "../hooks/useFetchFavicons";

interface FetchMetadataStatsProps {
  fetchMetadata: FetchMetadata;
}

const toSeconds = (ms: number): string => {
  return (ms / 1000).toPrecision(3);
};

export const FetchMetadataStats: React.FC<FetchMetadataStatsProps> = ({
  fetchMetadata
}) => (
  <Box maxW={900}>
    <StatGroup>
      <Stat pr={10}>
        <StatLabel>Successful</StatLabel>
        <StatNumber>{fetchMetadata.successfulCount}</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Failed</StatLabel>
        <StatNumber>{fetchMetadata.unsuccessfulCount}</StatNumber>
      </Stat>

      <Stat data-testid="timeElapsed" pl={10}>
        <StatLabel>Time</StatLabel>
        <StatNumber>{toSeconds(fetchMetadata.timeElapsed)}</StatNumber>
        <StatLabel>seconds</StatLabel>
      </Stat>
    </StatGroup>
  </Box>
);
