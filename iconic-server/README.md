# Iconic: Favicon Finder Server

Provides API to take a list of domains and stream all the favicons.

### Main Features

- receives list of domains and concurrently fetches (max 50 at a time) favicons for each domain

  - naively look for an image-like content-type on `http://${domain}/favicon.ico`
  - fallback to parsing DOM for `<link>` elements with potential favicon hrefs
  - timeout any network call after 10 seconds

- stream back favicon JSON results as they are found
  - successful/failed favicon: `{favicon}\n\n\n` (failed have `reason` field instead of `favicon` field, note the `\n\n\n` separator)
  - `!END!{metadata}` indicates server is done

### Key Libraries

- [express](http://expressjs.com/) for web framework.
- [htmlparser2](https://www.npmjs.com/package/htmlparser2) to parse DOM for favicon links.

## Available Scripts

### `npm run dev`

Runs the app in development mode on port 8000.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm start`

Runs the built production app on port 8000.
