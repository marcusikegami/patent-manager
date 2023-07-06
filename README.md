# Patent Manager

## Description

A simple web application to manage patents.

## Installation

I am very unaware as to how to make these installation instructions viable on more secure machines, however, I am using

-   PHP locally
-   NPM locally
-   Composer/Artisan locally

to install the depencies, run `npm install` after cloning the repository.

### Database

The database is a MySQL database, and the schema is located in the `database` folder.

### .env

The .env file is not included in the repository, however, a .env.example file is included. This file can be copied and renamed to .env, and the values can be changed to match the local environment. The .env file is used to store the database credentials, and the email credentials.

In the root directory rename the .env.example file to .env and configure the database and email credentials. Next, navigate to /react-vite and rename the .env.example file to .env and configure the REACT_APP_API_URL to match the Laravel server.
It is set to http://localhost:8000/api by default.

### Migrations

To migrate the database, run `npm run migrate`.

### Seeders

To seed the database, run `npm run seed`

## Running the servers

Run `npm serve` to start the Laravel server.

In a separate terminal run `npm watch` to start the React Client.

Navigate to http://localhost:3000 to view the client.
default user is 'admin@example.com'
default password is 'password'.

### Note

Email functionalities will not work unless the .env is properly configured with a compatible email.
refer to .env.example and save it as .env when configured
