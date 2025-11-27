This project is a simple full-stack application built using the MERN stack.
It has a backend made with Node.js and Express and a frontend made with React.
The main purpose of the project is to display a list of products, view details of each product, and add new products using a form.

Project Structure

JayaGour-Milestone2-FullstackMERN
– backend
– product-dashboard-frontend

The backend contains server.js, products.json and package.json.
The frontend contains all React files inside the src and public folders.

How to Run the Backend

Open a terminal.

Go into the backend folder using:
cd backend

Install backend packages using:
npm install

Start the backend using:
node server.js

The backend will start on:
http://localhost:5000/products

How to Run the Frontend

Open another terminal.

Go into the frontend folder using:
cd product-dashboard-frontend

Install frontend packages using:
npm install

Start the frontend using:
npm start

The frontend will open in the browser on:
http://localhost:3000

Features of the Application

Product List Page
Shows all the products coming from the backend.

Product Details Page
When a user clicks on View Details, full product details are shown.

Add Product Page
The user can add a new product.
Form validation is done using Formik and Yup.
On successful submit, the new product gets added to the backend json file.

Context API
Used to manage the global product data and share it between components.

Lazy Loading
Product Details page is loaded lazily to improve performance.

API Endpoints

Get all products
http://localhost:5000/products

Get product by ID
http://localhost:5000/products/id

Add a new product
POST http://localhost:5000/products

Body contains name, price, category and description in JSON format.

Conclusion

It includes routing, API integration, form validation, lazy loading and context API.
The UI is built using React and Bootstrap.
You can now run both backend and frontend together and test all the pages.