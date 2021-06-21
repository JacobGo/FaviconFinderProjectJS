# Iconic: Favicon Finder Frontend

Handles CSV processing, fetching results from server, and rendering UI.

### Main Features

- domain list file upload
- progress bar
- fetch metadata stats (successful, failed, time elapsed)
- table of favicons
- download button
- light/dark mode for fun

### Key Libraries

- [Papa Parse](https://www.papaparse.com/) for in-browser CSV parsing and generation.
- [react-lazy-load](https://www.npmjs.com/package/react-lazy-load) to show favicons in the table only within viewport.
- React with [Chakra UI](https://chakra-ui.com/) through [create-react-app](https://chakra-ui.com/guides/integrations/with-cra).

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
