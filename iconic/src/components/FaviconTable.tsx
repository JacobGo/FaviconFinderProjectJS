import {
  Box,
  Flex,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaviconDomain } from "../hooks/useFetchFavicons";
import { DownloadList } from "./DownloadList";

interface FaviconTableProps {
  faviconsList: FaviconDomain[];
}

export const FaviconTable: React.FC<FaviconTableProps> = ({ faviconsList }) => {
  return (
    <Box>
      <Flex p={2}>
        <Spacer />
        <DownloadList faviconsList={faviconsList} />
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th isNumeric>Rank</Th>
            <Th>Domain</Th>
            <Th>Favicon</Th>
            <Th>Favicon URL</Th>
          </Tr>
        </Thead>
        <Tbody>
          {faviconsList.map((faviconDomain) => (
            <Tr key={faviconDomain.number}>
              <Td isNumeric>{faviconDomain.number}</Td>
              <Td>{faviconDomain.domain}</Td>
              <Td>
                <LazyLoadImage src={faviconDomain.favicon} width={16} />
              </Td>
              <Td>{faviconDomain.favicon}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
