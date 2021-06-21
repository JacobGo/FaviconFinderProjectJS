import {
  Box,
  Button,
  Center,
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Spacer,
  theme,
  VStack
} from "@chakra-ui/react";
import * as React from "react";
// Custom UI Components
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"; // From Chakra UI
import { ErrorAlert, ErrorType } from "./components/ErrorAlert";
import { FaviconTable } from "./components/FaviconTable";
import { FetchMetadataStats } from "./components/FetchMetadataStats";
import { FileUpload } from "./components/FileUpload";
// Data Hooks
import { useFetchFavicons } from "./hooks/useFetchFavicons";
import { useParseDomainsList } from "./hooks/useParseDomainsList";

export const App = () => {
  const [file, setFile] = React.useState<File>();
  const [domainsList, parsingError] = useParseDomainsList(file);
  const [
    faviconsList,
    fetchData,
    isLoading,
    fetchingError,
    fetchMetadata,
    finishedFavicons
  ] = useFetchFavicons(domainsList);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Flex p={2}>
          <Spacer />
          <ColorModeSwitcher />
        </Flex>
        <Center>
          <FileUpload setFile={setFile} />
          <Button
            isLoading={isLoading}
            disabled={!!parsingError || domainsList.length === 0}
            onClick={() => fetchData()}
            loadingText="Finding"
          >
            Find Favicons
          </Button>
        </Center>
        {parsingError && (
          <ErrorAlert error={parsingError} type={ErrorType.ParsingError} />
        )}
        {fetchingError && (
          <ErrorAlert error={fetchingError} type={ErrorType.ServerError} />
        )}
        <Center>
          <VStack>
            {fetchMetadata && (
              <FetchMetadataStats fetchMetadata={fetchMetadata} />
            )}
            {isLoading && (
              <CircularProgress
                color="#F2D14C"
                min={0}
                value={finishedFavicons}
                max={domainsList.length}
                size="120px"
              >
                <CircularProgressLabel>{`${finishedFavicons} / ${domainsList.length}`}</CircularProgressLabel>
              </CircularProgress>
            )}
          </VStack>
        </Center>
        <FaviconTable faviconsList={faviconsList} />
      </Box>
    </ChakraProvider>
  );
};
