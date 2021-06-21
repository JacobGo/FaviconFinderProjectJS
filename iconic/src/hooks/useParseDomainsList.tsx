import * as papa from "papaparse";
import React from "react";

export type Domain = {
  number: number;
  domain: string;
};

// Type guard to help us only parse valid rows.
const isDomain = (obj: any): boolean => {
  const test = obj as Domain;
  return (
    typeof test.number === "number" &&
    !isNaN(test.number) &&
    typeof test.domain === "string"
  );
};

export const useParseDomainsList = (
  file: File | undefined
): [Domain[], Error | undefined] => {
  const [domainsList, setDomainsList] = React.useState<Domain[]>([]);
  const [parsingError, setError] = React.useState<Error>();

  const parseCSV = async (file: File) => {
    const papaParse = (file: File) => {
      // Wrap papa parsing library with a Promise so we can await it.
      return new Promise(function (complete, error) {
        papa.parse(file, { complete, error });
      });
    };

    try {
      const parse = (await papaParse(file)) as any;
      const listFromParse: Domain[] = parse.data
        .map((row: string[]) => ({
          number: Number(row[0]),
          domain: row[1]
        }))
        .filter(isDomain);
      if (listFromParse.length === 0) {
        throw Error("no domains parsed.");
      }
      setDomainsList(listFromParse);
      setError(undefined);
    } catch (e) {
      setError(Error(`Failed to parse domain list: ${e.message}`));
    }
  };

  React.useEffect(() => {
    if (file) {
      parseCSV(file);
    }
  }, [file]);

  return [domainsList, parsingError];
};
