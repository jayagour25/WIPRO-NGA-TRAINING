React runs on port 3000.
Node backend runs on port 4000.

React shows product listing, login forms, responsive component, and user details.
User details page requires data from the backend.

To set up the project, install dependencies for both the frontend and backend.

To set up the React app:

Open the react-app folder.

Run the command: npm install

Run the command: npm start
This will start the React application at http://localhost:3000

To set up the Node backend:

Open the node-assignments folder.

Run the command: npm install

Run the command: node q9-express.js
This will start the API server at http://localhost:4000

The backend provides the following important routes for the project:

GET /users/:id
Returns user information needed by the React User Details page.

GET /products
Returns a list of products.

POST /products
Adds a product after validating name and price.

If you open http://localhost:4000/
 and see "Cannot GET /", this is normal.
Only the specific defined routes will return data.

The React app will work only when both servers are running.
To test the user details page, visit http://localhost:3000/users/1
 while the backend is running.

This completes the project.