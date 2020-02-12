# R-mart

## A place to manage your routes.

## By [Sundeep Charan Ramkumar](https://sundeepcharan.com, 'Personal website')

## Table of contents

1. Introduction
2. Installation procedure
3. Tech Stack used
4. API Endpoints

### Introduction:

[Demonstration video](https://www.dropbox.com/s/ew3tyqpfb4ecech/R-Care%20MERN%20TypeScript%20app%20Demo.mov?dl=0).

The application is built on the problem of viewing a repository for the routes being travelled to and fro on a day-to-day basis. Users can view a polyline through the stops the route travels, and can be able to view gepgraphically with the help of Google maps API.

### Installation procedure:

Since this entire application (back as well as front end) is built in TypeScript, the source code is located in src directory.

- To install both backend and front end

  ```bash
  npm install
  npm install --prefix=src/client
  ```

- To compile the file
  ```bash
  npm run dev
  ```
- To run the server
  ```bash
  npm run server
  ```
- To start the client server
  ```bash
  npm run client
  ```
- To start both servers
  ```bash
  npm run dev
  ```

### Tech Stack used:

1. Front end - React, Redux, Redux Saga, TypeScript, Node-sass, React-Router
2. Back end - Node, Express, MongoDB, TypeScript, multer.

### API Endpoints:

Documentation by [POSTMAN](https://documenter.getpostman.com/view/5984344/SWTHbaUd)
