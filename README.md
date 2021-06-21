# Iconic: Favicon Finder

Scrapes the first 1,000 domains of the Alexa top million domains, finds their favicon URL, and saves the results to a CSV.

CSV workflows are done in-browser, see `useParseDomainList` and `DownloadList`. Favicon scraping is done on the server with results dynamically streamed over as individual JSON objects, see `useFetchFavicons`.

Note: I initially stored the favicons in memory on the server until all the requests succeeded or failed, but I decided it would be neat to stream the favicons over as they were found and provide an accurate progress bar. I wound up with a custom Streams based implementation requiring tight coupling between client and server, the algorithm is described in server README. The live updates are cool, but the resulting complexity is harder to test and reason about.

### Frontend: `/iconic/README.md`

### Server: `/iconic-server/README.md`

## Notes

- Definitely need tests for server logic given more time.
- How can I share types between server and client?
- Why am I bottlenecked when concurrently fetching favicons?
