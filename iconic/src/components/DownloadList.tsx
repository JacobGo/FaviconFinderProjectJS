import { DownloadIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import * as papa from "papaparse";
import React from "react";
import { FaviconDomain } from "../hooks/useFetchFavicons";

interface DownloadListProps {
  faviconsList: FaviconDomain[];
}

export const DownloadList: React.FC<DownloadListProps> = ({ faviconsList }) => {
  const downloadList = () => {
    // Rename fields to match expected headers.
    const renamedFaviconsList = faviconsList.map((favicon) => ({
      rank: favicon.number,
      domain: favicon.domain,
      favicon_url: favicon.favicon
    }));
    const csv = papa.unparse(renamedFaviconsList);
    const file = new File([csv], "favicons.csv", { type: "text/plain" });

    // Download file code from https://stackoverflow.com/a/52273870 and others.
    const exportUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = exportUrl;
    a.download = "favicons.csv";
    a.click();
    a.remove();
    URL.revokeObjectURL(exportUrl);
  };
  return (
    <IconButton
      aria-label="Download favicon list"
      data-testid="downloadList"
      icon={<DownloadIcon />}
      disabled={faviconsList.length === 0}
      onClick={() => downloadList()}
    >
      Download
    </IconButton>
  );
};
