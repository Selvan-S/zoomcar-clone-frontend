# Zoomcar Clone
## About

Zoomcar Clone is a car rental application designed to provide users with a seamless vehicle rental experience. Users can search and filter vehicles based on categories and budget, view availability and price details, manage bookings, and process secure payments. The app ensures a user-friendly interface, secure access, and comprehensive booking management.<br /><hr />
## Links
- Check out the live website [here](https://zoomcar-clone-selvan.netlify.app/)!.
- To Check the Backend code of the Zoomcar Clone project, please refer to this [link](https://github.com/Selvan-S/zoomcar-clone-backend).
## Technologies used
- **Frontend:** React.js, Formik, React Router, Context API, CSS (Tailwind CSS, DaisyUI)
-	**Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt
-	**Payment Processing:** Stripe Payment
-	**Deployment:** Netlify, Render
## Responsibilities
- Ensured responsive design using Tailwind CSS and DaisyUI.
- Developed frontend components and managed state using React, Formik, Context API.
- Built and maintained backend APIs with Node.js and Express.js.
- Secured user authentication and authorization using JWT and Bcrypt.
- Integrated middleware for user permissions and role-based access control.
- Managed data storage and retrieval with MongoDB.
## Run
Step 1: Clone or Fork the [`zoomcar-clone-backend`](https://github.com/Selvan-S/zoomcar-clone-backend) respository. Run the Backend, note the localhost PORT.<br /><br/>
Step 2: Create a `.env.development.local` file in the root folder (Frontend) and give the following ENV variables and values.
```
VITE_ZOOM_CAR_CLONE_BASE_API_URL = http://localhost:<Backend PORT>
VITE_AUTH_BASE_URL=api/v1/auth
VITE_USER_BASE_URL=api/v1/user
VITE_VEHICLES_BASE_URL=api/v1/vehicles
VITE_BOOKINGS_BASE_URL=api/v1/bookings
VITE_REVIEWS_BASE_URL=api/v1/reviews
VITE_PAYMENT_BASE_URL=api/v1/payment
VITE_STRIPE_PUBLISHABLE_KEY=<Your stripe publishable KEY here>
VITE_IMGUR_CLIENT_ID=<Your imgur client ID here>
```
Step 3: Add the `.env.development.local` in `.gitignore` file <br/> <br/>
Step 4: Install dependencies
```
npm install
```
Step 5: Run the application
```
npm run dev
```
