import { renderHook } from "@testing-library/react-hooks";
import { useParseDomainsList } from "./useParseDomainsList";

test("parses valid domain lists", async () => {
  const file = new File(["1,google.com\n2,example.com"], "test.csv", {
    type: "text/plain"
  });

  const { result, waitForNextUpdate } = renderHook(() =>
    useParseDomainsList(file)
  );
  await waitForNextUpdate();
  const [domainList, error] = result.current;
  expect(domainList).toHaveLength(2);
  expect(error).toBeUndefined();
});

test("parses invalid domain lists", async () => {
  const file = new File(["wrong,file,format\nno,domains,here"], "test.csv", {
    type: "text/plain"
  });
  const { result, waitForNextUpdate } = renderHook(() =>
    useParseDomainsList(file)
  );
  await waitForNextUpdate();
  const [domainList, error] = result.current;
  expect(domainList).toHaveLength(0);
  expect(error?.message).toMatch(/no domains parsed/i);
});
