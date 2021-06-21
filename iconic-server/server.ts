import express from "express";
import { Domain, FaviconDomain, FaviconFailure, findFavicon } from "./favicon";
import pLimit from "p-limit";
import path from "path";

const app = express();

// Extract JSON from POST
app.use(express.json());

app.use(express.static(path.join(__dirname, "./client")));
app.post("/api/favicons", async (req, res) => {
  const domainsList = req.body as [];

  console.log(`Parsing ${domainsList.length} domains.`);

  const startTime = process.hrtime();

  // Limit number of parallel requests to 50
  const limit = pLimit(50);

  res.contentType("application");
  res.setHeader("Transfer-Encoding", "chunked");
  const findAndSendFavicon = async (
    domain: Domain,
    res: any
  ): Promise<FaviconDomain | FaviconFailure> => {
    try {
      const favicon = await findFavicon(domain);
      res.write(JSON.stringify(favicon) + "\n\n\n");
      return favicon;
    } catch (e) {
      const failedFavicon: FaviconFailure = {
        ...domain,
        reason: e.message
      };
      res.write(JSON.stringify(failedFavicon) + "\n\n\n");
      throw Error("failed to find favicon");
    }
  };
  const faviconPromises = await Promise.allSettled(
    domainsList.map((domain) => limit(findAndSendFavicon, domain, res))
  );

  const successfulCount = faviconPromises.filter(
    (result) => result.status === "fulfilled"
  ).length;
  const unsuccessfulCount = faviconPromises.filter(
    (result) => result.status === "rejected"
  ).length;

  const endTime = process.hrtime(startTime);
  const timeInMs = (endTime[0] * 1000000000 + endTime[1]) / 1000000;

  const metadata = {
    successfulCount,
    unsuccessfulCount,
    timeElapsed: timeInMs
  };

  console.log(`Parsed ${domainsList.length} domains in ${timeInMs}ms`);
  res.write(`!END!${JSON.stringify(metadata)}`);
  res.end();
});

app.listen(8000, () => {
  console.log("The application is listening on 8000.");
});
