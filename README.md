# Home Library Service
## Note: if you want to run all test cases successfully, replace to `"test": "jest --testMatch \"<rootDir>/*.spec.ts\" --noStackTrace --runInBand",` in package.json (I did not do this because of point -670 Changes in tests)
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/FreSemin/nodejs2024Q1-service
```

## Rename from .env.example to .env file

## Docker-compose

```
docker compose up --build
```

## Docker check for vulnerabilities

```
npm run docker-audit:api
npm run docker-audit:db
```

## Installing NPM modules

```
npm install
```

## Running application

Create `.env` from `.env.example` in the root folder

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
