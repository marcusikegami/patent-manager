# Patent Manager Project Architecture

## Table of Contents

-   [Description](#description)

## Description

This document describes the architecture of the Patent Manager project.
The project is split into two parts, the Laravel server and the React client.
The Laravel server is responsible for the database and the API, while the React client is responsible for the user interface.

The Laravel server is a REST API, and the React client is a SPA (Single Page Application).

### UI

The UI is built using React Vite(js) and TailwindCSS. The UI is a SPA (Single Page Application)

### Routing

The routing is handled by React Router. The routes are defined in the `src/routes.js` file.

### Data Fetching

The data fetching is handled by Axios. Requests are made to the API, and the responses are handled within components.

### Rendering

The rendering is handled by React. The components are defined in the `src/components` directory.

### Integrations

### Infrastructure

The infrastructure is handled by Hostinger. The server is a VPS (Virtual Private Server) running Ubuntu. The server is running Apache2, PHP 8.2, and MySQL.
