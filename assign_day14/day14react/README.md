Day 14 React Assignment

Step 1
Create a folder named assign_day14.

Step 2
Open the folder in VS Code.

Step 3
Create a React app inside it using this command:
npx create-react-app day14react

Step 4
Go inside the project folder:
cd day14react

Step 5
Install Bootstrap:
npm install bootstrap

Step 6
Inside src/index.js, add this line:
import 'bootstrap/dist/css/bootstrap.min.css';

Step 7
Create these folders inside src:
components
pages

Step 8
Create the required component files inside src/components:
CourseDetails.jsx
InstructorProfile.jsx
StatsCard.jsx
ErrorBoundary.jsx
ProductCard.jsx
Modal.jsx

Step 9
Create the required page files inside src/pages:
LazyExample.jsx
StatsDashboard.jsx
ProductSection.jsx
NotificationsPage.jsx

Step 10
Replace the code in App.js with the assignment code.

Step 11
Replace and add code in all component and page files as given.

Step 12
Make sure public/index.html contains two divs:

<div id="root"></div> <div id="modal-root"></div>

Step 13
Start the React project using:
npm start

Step 14
Test all four features:
Lazy loading
Pure components
Error boundary
Portal modal