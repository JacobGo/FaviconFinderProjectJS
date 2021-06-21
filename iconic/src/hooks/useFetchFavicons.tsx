import React from "react";
import { Domain } from "./useParseDomainsList";

export type FaviconDomain = Domain & {
  favicon: string;
};
export type FaviconFailure = Domain & {
  reason: string;
};
export type FetchMetadata = {
  successfulCount: number | undefined;
  unsuccessfulCount: number | undefined;
  timeElapsed: number;
};

export const useFetchFavicons = (
  domainsList: Domain[]
): [
  FaviconDomain[],
  () => void,
  boolean,
  Error | undefined,
  FetchMetadata | undefined,
  number
] => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [fetchingError, setError] = React.useState<Error>();

  const [faviconsList, setFaviconsList] = React.useState<FaviconDomain[]>([]);
  const [fetchMetadata, setMetadata] = React.useState<FetchMetadata>();

  const [finishedFavicons, setFinishedFavicons] = React.useState<number>(0);

  const fetchData = async () => {
    setLoading(true);
    setFinishedFavicons(0);
    try {
      const response = await fetch("/api/favicons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(domainsList)
      });
      const reader = response.body?.getReader();
      const faviconBuffer: FaviconDomain[] = [];
      if (!reader) {
        throw new Error("could not read stream");
      }
      let progressCount = 0;
      const progressUpdateInterval = setInterval(() => {
        setFinishedFavicons(progressCount);
        setFaviconsList(faviconBuffer);
      }, 100);

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        if (!value) {
          continue;
        }
        // TypeScript doesn't realize that UInt8 is a number, so we ignore the warning.
        // @ts-ignore
        const dataString = String.fromCharCode.apply(String, value);
        dataString.split("\n\n\n").forEach((string) => {
          const cleanedString = string.trim();
          if (cleanedString === "") {
            return;
          }
          if (string.startsWith("!END!")) {
            const metadata = JSON.parse(cleanedString.slice(5));
            setMetadata(metadata);
          } else {
            const favicon = JSON.parse(cleanedString) as FaviconDomain;
            if (favicon.favicon) {
              faviconBuffer.push(favicon);
            } else {
              // We just ignore failures now.
              // TODO: show failure reasons.
            }
            progressCount++;
            setMetadata(fetchMetadata);
          }
        });
      }
      clearInterval(progressUpdateInterval);
      setFaviconsList(
        faviconBuffer.sort((a, b) => (a.number > b.number ? 1 : -1))
      );
      setError(undefined);
    } catch (e) {
      setError(Error(`Failed to fetch favicon data: ${e.message}`));
    } finally {
      setLoading(false);
    }
  };
  return [
    faviconsList,
    fetchData,
    isLoading,
    fetchingError,
    fetchMetadata,
    finishedFavicons
  ];
};
