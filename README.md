# WaveCraft

WaveCraft is a full-stack MERN e-commerce web application developed as an assessment project. It allows users to browse, search and purchase premium audio products including headphones, earbuds, speakers and accessories.

The project was built to gain practical experience in full-stack web development by implementing authentication, product management, shopping cart functionality and deploying a complete application on the cloud.

## Live Demo

Website: https://wave-craft-e-commerce-platform.vercel.app

Backend API: https://wavecraft-api.onrender.com

## Features

- User Registration and Login
- Google Sign-In Authentication
- JWT Authentication
- Browse Products
- Search Products
- Category-wise Filtering
- Shopping Cart
- Admin Dashboard
- Add, Edit and Delete Products
- Responsive Design
- Dark and Light Theme
- MongoDB Atlas Database

## Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google OAuth

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
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Running Locally

Start Backend

```bash
cd backend
npm run dev
```

Start Frontend

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

### Backend (Render)

1. Push the project to GitHub.
2. Create a new Web Service on Render.
3. Select the GitHub repository.
4. Set the Root Directory to:

```text
backend
```

5. Add the required environment variables:

```env
MONGO_URI
JWT_SECRET
GOOGLE_CLIENT_ID
CLIENT_URL
ADMIN_EMAILS
```

6. Deploy the service.

### Frontend (Vercel)

1. Import the GitHub repository into Vercel.
2. Set the Root Directory to:

```text
frontend
```

3. Add the following environment variables:

```env
VITE_API_URL=https://your-render-backend-url/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Deploy the project.

### Google OAuth Configuration

Add the deployed frontend URL to the Google Cloud Console under:

- Authorized JavaScript Origins

Example

```
https://your-vercel-app.vercel.app
```

## Project Structure

```
WaveCraft-E-Commerce-platform
│
├── frontend
│
├── backend
│
└── README.md
```

## Website Screenshots

<img width="1920" height="1080" alt="Home Page" src="https://github.com/user-attachments/assets/f0f79ede-20af-468b-b5d2-188fcd995eaa" />

<img width="1920" height="1080" alt="Shop Page" src="https://github.com/user-attachments/assets/d6590e52-2d5d-4bd2-84a8-d388b29a1bd3" />

<img width="1920" height="1080" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/56560ff8-29fc-4303-a239-42b3d4742b05" />

<img width="1920" height="1080" alt="Cart Page" src="https://github.com/user-attachments/assets/a5251e6f-69a5-4860-bcd0-a64be1ad596b" />

## Author

**Tanish Mandhera**

B.Tech Computer Science Engineering (Artificial Intelligence & Machine Learning)

University Institute of Engineering and Technology (UIET)

Kurukshetra University
