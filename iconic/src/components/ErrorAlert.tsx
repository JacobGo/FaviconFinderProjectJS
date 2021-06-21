import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from "@chakra-ui/react";
import React from "react";

export enum ErrorType {
  ServerError,
  ParsingError
}
interface ErrorAlertProps {
  error: Error;
  type: ErrorType;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, type }) => {
  const errorTypeTitle = {
    [ErrorType.ParsingError]: "Parsing Error",
    [ErrorType.ServerError]: "Server Error"
  }[type];
  return (
    <Alert data-testid="errorAlert" status="error">
      <AlertIcon />
      <AlertTitle mr={2}>{errorTypeTitle}</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
};
