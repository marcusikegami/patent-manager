# Project Initialization

-   Run `laravel new t6-laravel-react-demo` in base directory (~`/projects`)
-   Run `php artisan migrate` within the working directory (WD) [WD = ~/t6-laravel-react-demo]. This will create the MySQL DB tables specified in the migration files.
-   Run `npm create vite` from WD
-   Typed (y) to proceed and selected Options React and JavaScript
-   Named folder 'react' (This is where our react files and Client-Side code is stored)
-   CD into `/react` and run `npm install` to install react depencies in the package.json folder.
-   Test that react install successfully by running `npm run dev` to start the VITE react-server.
-   Open package.json within `/react` and specify the port for your client server, in my case I chose 3000 (--port=3000). The updated line should look like `"dev": "vite --port={port}",`

## Cleanup and Configure /react Contents

-   Inside /src: delete App.css, App.jsx, Clear the contents of index.css, delete vite.svg from public directory.

## Views (React Components)

-   Inside /src: create a directory called 'views' which will hold React Components which are associated with specific routes. For example, at `/login` the router will render the 'Login.jsx' component
-   Inside /views create three files: 'Users.jsx', 'Login.jsx', and 'Signup.jsx' and import the following code:

```javascript
 const ${componentName} = () => {
    return (
        <div>
            <h1>${componentName}</h1>
        </div>
    )
}

export default ${componentName};
```

## Layouts (React Components rendered based on Authentication)

-   Inside /src: create a directory called 'layouts' which will hold subdirectories for React Components which are associated with specific routes. For example, an authenticated user will be routed to the 'Dashboard.jsx' component, which will be stored in the 'UserViews' directory.

# Congifure the React Router

-   Run `npm install react-router-dom` to install the react-router-dom dependency.
-   Create a new file in the src directory called 'Router.jsx' and add the following code:

```javascript
import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";

const router = createBrowserRouter([
    {
        path: "*",
        element: <div>404 Page Not Found</div>,
    },
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/users",
                element: <Users />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
```

The above code demonstrates how to create a router with react-router-dom. The `createBrowserRouter` function takes an array of objects as an argument. Each object represents a route. The `path` property specifies the route path, and the `element` property specifies the component that will be rendered when the route is accessed. The children are rendered inside their corresponding Layout within the react-router-dom `<Outlet>` component (See GuestLayout.jsx) The `*` path is a wildcard that will be used to render a 404 page if the user attempts to access a route that does not exist.

# Connecting the React Client to the Laravel Server

-   Inside `/src` create a file called `axios-client.js` and add the following code:

```javascript

```

# Controller Creation

-   Run `php artisan make:controller ${directory}/${controllerName}` to create a controller. For example, `php artisan make:controller Auth/LoginController` will create a controller called LoginController in the Auth directory.

# Request Creation

-   Run `php artisan make:request ${requestName}` to create a request

# Hosting, Domain, and SSL

-   inside public_html create a file (ex. .htaccess) and add the following code:

````
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.html ```
````
