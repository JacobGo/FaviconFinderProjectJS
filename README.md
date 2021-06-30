# Iconic: Favicon Finder

> [Live Demo deployed to Digital Ocean](https://favicon-finder-project-js-qrrz2.ondigitalocean.app/)

Scrapes the first 1,000 domains of the Alexa top million domains, finds their favicon URL, and saves the results to a CSV.

CSV workflows are done in-browser, see `useParseDomainList` and `DownloadList`. Favicon scraping is done on the server with results dynamically streamed over as individual JSON objects, see `useFetchFavicons`.

Note: I initially stored the favicons in memory on the server until all the requests succeeded or failed, but I decided it would be neat to stream the favicons over as they were found and provide an accurate progress bar. I wound up with a custom Streams based implementation requiring tight coupling between client and server, the algorithm is described in server README. The live updates are cool, but the resulting complexity is harder to test and reason about.

### [Frontend](./iconic/README.md)

### [Server](./iconic-server/README.md)

### [favicons.csv Result](./favicons.csv)

## Deployment

### Manual:

```
docker build . -t jacgoldman/iconic
docker run -it -p 8000:8000  jacgoldman/iconic
```

### Digital Ocean

Import this repo to Apps.

## Notes

- Definitely need tests for server logic given more time.

## Future Improvements

- Properly test streaming implementation (how to mock ReadableStream in `fetch` response body?)
- Share types between server and client.
- Set server concurrent favicon fetching pool limit via environment variable instead of hardcoded to 50.
- Investigate why we get bottlenecked when concurrently fetching favicons. Throttling? Ratelimiting?
- Implement full CI with linting, testing, and build. Currently lint on save with Prettier.
- Provide UI to show reasons for favicon fetch failures, properly set `reason` when no favicon is found.
- Short-circuit DOM traversal when the first valid favicon link element is found, logs show that we keep on looking. Favicons are usually in the `<head>` of the document.
- Evaluate different strategies to increase success rate and speed:
  - distribute work across multiple worker nodes
  - tolerate longer response times (don't timeout early)
  - use proxies to circumvent potential rate limiting from CDNs
  - develop better heuristics to find favicons
    - accept all possible headers for naive `/favicon.ico` link, including base64 and plain/text
    - execute JavaScript in case favicon link element is dynamically inserted
    - fallback to 3rd party favicon provider. Google has a nice API for this.
