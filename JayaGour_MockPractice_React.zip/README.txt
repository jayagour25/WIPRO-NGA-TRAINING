Project Title: Travel Booking Platform  
Participant Name: Jaya Gour  
Module: ReactJS  
Assessment Type: Mock Practice Assessment  
Date: 12-Nov-2025

USER STORY 1
Implemented Components:
- Header, Footer, DestinationCard
- Reusable props & JSX for dynamic rendering
- Wishlist button state handling using useState
- Styling applied with Bootstrap classes
Achieved:
- Proper component structure under /src/components
- Dynamic rendering of featured destinations on /home
- Event handling for wishlist feature

USER STORY 2 – Routing & Data Integration
 Routing:
- Implemented using react-router-dom v6
- Routes: /home, /packages, /contact, /dashboard, /booking/:id

 Data Integration:
- Used json-server (port 4000) as mock backend
- Fetched data using useEffect hook from db.json
- Dynamic cards displayed for packages
- Lifecycle and error handling implemented

PropTypes validation added to key components

USER STORY 3 – Booking Form & Advanced State Management
Implemented
- Booking form using Formik + Yup validation
- Custom hook (useBookingSubmit) for form submission logic
- Redux Toolkit for global state management (bookingSlice.js)
- ErrorBoundary added to catch rendering errors
- PWA support enabled using CRA PWA template

SETUP & EXECUTION GUIDE


To run the project:

Install dependencies:
   npm install

Start mock backend (JSON Server):
   npx json-server --watch db.json --port 4000

Run React App:
   npm start

Open browser:
   http://localhost:3000

Available routes:
   /home        → Featured destinations
   /packages    → Travel packages from API
   /contact     → Contact info
   /booking/:id → Booking form with validation
   /dashboard   → Redux simulation

SCREENSHOTS INCLUDED

screenshots/
- homepage.png
- packages.png
- bookingform.png
- contact.png
- dashboard.png