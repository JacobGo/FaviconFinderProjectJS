import { Box, HStack } from "@chakra-ui/react";
import * as React from "react";

type FileUploadProps = {
  setFile: (file: File | undefined) => void;
};

export const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length && event.target.files?.length > 0) {
      setFile(event.target.files[0]);
    } else {
      setFile(undefined);
    }
  };

  return (
    <HStack spacing={8} p={8} maxW={800}>
      <Box>
        <input
          accept=".csv"
          type="file"
          id="upload"
          data-testid="uploader"
          onChange={onFileChange}
        />
      </Box>
    </HStack>
  );
};
