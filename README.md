# WaveCraft

WaveCraft is a full-stack MERN e-commerce web application developed as a technical assessment project. It allows users to browse, search and purchase premium audio products including headphones, earbuds, speakers and accessories.

The project was built to gain practical experience in full-stack web development by implementing secure authentication, payment gateway integration, product management, shopping cart functionality and deploying a complete application to the cloud.

## Live Demo

Website: https://wave-craft-e-commerce-platform.vercel.app

Backend API: https://wavecraft-api.onrender.com

## Features

- User Registration and Login
- Google Sign-In Authentication
- JWT Authentication
- Browse Products
- Product Search
- Category-wise Filtering
- Shopping Cart
- Razorpay Payment Gateway Integration
- Secure Payment Verification
- Admin Dashboard
- Add, Edit and Delete Products
- Responsive Design
- Dark and Light Theme
- MongoDB Atlas Database

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google OAuth
- Razorpay Payment Gateway

## Installation

Clone the repository

```bash
git clone https://github.com/ByteByTanish/WaveCraft-E-Commerce-platform.git
```

Move into the project

```bash
cd WaveCraft-E-Commerce-platform
```

Install frontend dependencies

```bash
cd frontend
npm install
```

Install backend dependencies

```bash
cd ../backend
npm install
```

## Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
CLIENT_URL=http://localhost:5173
ADMIN_EMAILS=your_email@gmail.com

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Running Locally

Start the backend

```bash
cd backend
npm run dev
```

Start the frontend

```bash
cd frontend
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:5000
```

## Deployment

### Backend Deployment (Render)

1. Push the repository to GitHub.
2. Create a new **Web Service** on Render.
3. Connect the GitHub repository.
4. Set the **Root Directory** to:

```text
backend
```

5. Add the following Environment Variables:

```env
MONGO_URI
JWT_SECRET
GOOGLE_CLIENT_ID
CLIENT_URL
ADMIN_EMAILS

RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

6. Deploy the backend.

---

### Frontend Deployment (Vercel)

1. Import the GitHub repository into Vercel.
2. Set the **Root Directory** to:

```text
frontend
```

3. Add the following Environment Variables:

```env
VITE_API_URL=https://your-render-backend-url/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. Deploy the frontend.

---

### Google OAuth Configuration

In Google Cloud Console add your deployed frontend URL under:

- Authorized JavaScript Origins

Example

```
https://your-vercel-app.vercel.app
```

---

### Razorpay Configuration

1. Create a Razorpay Developer Account.
2. Generate Test API Keys from the Razorpay Dashboard.
3. Add the Key ID and Key Secret to the backend environment variables.
4. Add the Razorpay Key ID to the frontend environment variables.
5. Redeploy both Render and Vercel after updating environment variables.

## Payment Flow

1. User adds products to the cart.
2. Clicks **Proceed to Payment**.
3. Backend creates a Razorpay Order.
4. Razorpay Checkout opens securely.
5. Payment is verified on the backend.
6. User is redirected to the Payment Success page.

## Project Structure

```
WaveCraft-E-Commerce-platform
│
├── frontend
│
├── backend
│
├── .gitignore
│
└── README.md
```

## Website Screenshots

### Home Page

<img width="1920" height="1080" alt="Home Page" src="https://github.com/user-attachments/assets/f0f79ede-20af-468b-b5d2-188fcd995eaa" />

### Shop Page

<img width="1920" height="1080" alt="Shop Page" src="https://github.com/user-attachments/assets/d6590e52-2d5d-4bd2-84a8-d388b29a1bd3" />

### Admin Dashboard

<img width="1920" height="1080" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/56560ff8-29fc-4303-a239-42b3d4742b05" />

### Shopping Cart

<img width="1920" height="1080" alt="Cart Page" src="https://github.com/user-attachments/assets/a5251e6f-69a5-4860-bcd0-a64be1ad596b" />

## Author

**Tanish Mandhera**

B.Tech Computer Science Engineering (Artificial Intelligence & Machine Learning)

University Institute of Engineering and Technology (UIET)

Kurukshetra University
