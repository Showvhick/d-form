# D-Form
## Dynamic form generator using react

![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

D-form is a simple monorepo for rendering form in react application using a defined json file in express server.

## Features
- Declare form fields using JSON
- Declare a timeout for a form
- Render form in react
- Data will persist untill timed out

## Tech

D-Form is using following libraries

- [ReactJS] - Front-end
- [node.js] - For the backend
- [Express] - NodeJS framework
- [Yarn Workspaces] - For monorepo architecture
- [Zod] - For data validation
- [Material UI] - As front-end framework
- [moment] - For time management
- [Redux-toolkit] - For front-end state management along with react
- [redux-saga] - For asynchronous api calls
- [redux-persist] - For persisting state

## Installation

Install the dependencies and devDependencies and start the server.

```sh
yarn install
yarn dev
```
Front-end is supposed to run on http://localhost:3000
Back-end is supposed to run on http://localhost:5400

-If you want to make any change, please update .env files inside app and apis directory. -All types are declared inside ./types directory
