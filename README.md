# WaveCraft — E-commerce Web Application

A full-stack e-commerce app for an audio-gear store, built as an academic assessment project. React (Vite + Tailwind) frontend, Node/Express + MongoDB backend, JWT + Google authentication, and an admin panel for catalogue management.

## Live Demo

- Frontend: _add your deployed URL here after deploying_
- Backend API: _add your deployed URL here after deploying_

## Features

- **User authentication** — register/login with JWT, bcrypt-hashed passwords, plus optional **Sign in with Google**, persistent sessions via token in `localStorage`, protected routes
- **Admin panel** — add, edit, and delete products (name, brand, category, price, stock, image, description) through a dedicated `/admin` UI, restricted to admin accounts
- **Multi-page storefront** — dynamic Home (hero, trust badges, category grid, deals, featured picks), full Shop page with filters, standalone Categories page, and a Contact page
- **Product listing** — paginated grid, 33 seeded products across 6 categories (headphones, earbuds, wired earphones, speakers, turntables, accessories), with deal/discount pricing on a subset
- **Product details** — full spec sheet, quantity selector, stock display
- **Shopping cart** — persisted per user in MongoDB, add/update/remove/clear, live subtotal
- **Search & filtering** — full-text search, category, brand, price range, sorting (newest, price, rating)
- **Indian Rupee pricing** — all prices formatted as ₹ via `Intl.NumberFormat`
- **Light & dark mode** — toggle in the navbar, persisted across visits, calm natural green palette in both modes
- **Responsive UI** — mobile-first Tailwind layout, works from small phones to desktop

## Tech Stack

| Layer    | Technology                                              |
| -------- | --------------------------------------------------------- |
| Frontend | React 18, Vite, React Router, Tailwind CSS, Axios          |
| Backend  | Node.js, Express, Mongoose                                 |
| Database | MongoDB (Atlas)                                             |
| Auth     | JWT + bcryptjs, Google Identity Services + google-auth-library |
| Deploy   | Vercel (frontend), Render (backend), Atlas (DB)             |

## Project Structure

```
wavecraft/
├── backend/
│   ├── config/db.js
│   ├── models/          # User, Product, Cart
│   ├── middleware/      # auth, adminOnly, errorHandler
│   ├── routes/          # authRoutes, productRoutes, cartRoutes, adminRoutes
│   ├── seed/            # products.json + seed.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/client.js
        ├── lib/format.js         # INR currency formatting
        ├── context/              # AuthContext, CartContext, ThemeContext
        ├── components/           # Navbar, Logo, ProductCard, ProductImage,
        │                         # Filters, GoogleSignInButton, ProtectedRoute, AdminRoute
        └── pages/                # Home, Shop, Categories, Contact, ProductDetails,
                                    # Cart, Login, Register, Admin, NotFound
```

## API Reference

| Method | Endpoint                     | Auth  | Description                                                   |
| ------ | ----------------------------- | ----- | --------------------------------------------------------------- |
| POST   | `/api/auth/register`          | No    | Create account, returns JWT                                     |
| POST   | `/api/auth/login`             | No    | Log in, returns JWT                                              |
| POST   | `/api/auth/google`            | No    | Sign in with a Google ID token, returns JWT                      |
| GET    | `/api/auth/me`                | Yes   | Current user profile                                             |
| GET    | `/api/products`               | No    | List products (search/filter/sort/paginate via query params)    |
| GET    | `/api/products/:slug`         | No    | Single product                                                   |
| GET    | `/api/cart`                   | Yes   | Get current user's cart                                          |
| POST   | `/api/cart/items`              | Yes   | Add item `{ productId, quantity }`                                |
| PUT    | `/api/cart/items/:productId`   | Yes   | Update quantity                                                   |
| DELETE | `/api/cart/items/:productId`   | Yes   | Remove item                                                       |
| DELETE | `/api/cart`                   | Yes   | Clear cart                                                        |
| GET    | `/api/admin/products`         | Admin | List all products (management view)                              |
| POST   | `/api/admin/products`         | Admin | Create a product                                                  |
| PUT    | `/api/admin/products/:id`     | Admin | Update a product                                                  |
| DELETE | `/api/admin/products/:id`     | Admin | Delete a product                                                  |

Product query params: `search`, `category`, `brand`, `minPrice`, `maxPrice`, `sort` (`newest`/`price-asc`/`price-desc`/`rating`), `page`, `limit`.

## Local Setup

### Prerequisites
- Node.js 18+
- A MongoDB connection string (free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas) or local MongoDB)

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/wavecraft.git
cd wavecraft

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
PORT=5000
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<any long random string>
CLIENT_URL=http://localhost:5173
GOOGLE_CLIENT_ID=<your Google OAuth client ID, optional>
ADMIN_EMAILS=<comma-separated emails that should become admins on registration>
```

`GOOGLE_CLIENT_ID` and `ADMIN_EMAILS` are optional — the app runs fine without them, just without Google sign-in and without any admin accounts. See "Setting up admin access" and "Setting up Google sign-in" below.

```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env` if you want Google sign-in on the frontend too:
```
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=<same Google OAuth client ID as backend, optional>
```

### 3. Seed the database

```bash
cd backend
npm run seed
```

This loads 33 sample products across headphones, earbuds, wired earphones, speakers, turntables, and accessories, several with deal pricing for the homepage's "Best Deals" section.

### 4. Run the app

In two terminals:

```bash
# terminal 1
cd backend && npm run dev

# terminal 2
cd frontend && npm run dev
```

Visit `http://localhost:5173`.

## Setting up admin access

1. In `backend/.env`, set `ADMIN_EMAILS` to your email address (comma-separated if more than one).
2. Register a new account (or Google sign in) using that exact email.
3. That account is created with `role: "admin"` automatically, and an **Admin** link appears in the navbar leading to `/admin`.
4. Existing accounts can be promoted manually by editing their document in MongoDB Atlas (`role: "admin"`).

## Setting up Google sign-in

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → create a project (or use an existing one).
2. APIs & Services → Credentials → Create Credentials → OAuth client ID → Application type: **Web application**.
3. Add `http://localhost:5173` (and your deployed frontend URL later) under **Authorized JavaScript origins**.
4. Copy the generated Client ID.
5. Paste it into `backend/.env` as `GOOGLE_CLIENT_ID` and into `frontend/.env` as `VITE_GOOGLE_CLIENT_ID`.
6. Restart both dev servers. A "Sign in with Google" button now appears on the Login and Register pages.

If you skip this setup, the app still works normally with email/password auth — the login page just shows a small note instead of the Google button.

## Deployment Guide

### Database — MongoDB Atlas
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow network access from anywhere (`0.0.0.0/0`) for simplicity.
3. Copy the connection string — this is your `MONGO_URI`.

### Backend — Render
1. Push this repo to GitHub.
2. On [render.com](https://render.com), create a **New Web Service** from the repo, root directory `backend`.
3. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and optionally `GOOGLE_CLIENT_ID` / `ADMIN_EMAILS`.
5. Deploy, then run the seed script once via Render's shell (`npm run seed`) or a one-off job.

### Frontend — Vercel
1. On [vercel.com](https://vercel.com), import the repo, set root directory to `frontend`.
2. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add environment variable `VITE_API_URL` = `https://<your-render-service>.onrender.com/api`, and optionally `VITE_GOOGLE_CLIENT_ID`.
4. Deploy, then update the backend's `CLIENT_URL` env var to this Vercel URL and redeploy the backend so CORS allows it.
5. If using Google sign-in, add the deployed Vercel URL to **Authorized JavaScript origins** in the Google Cloud Console credential.

## Design Notes

The brand ("WaveCraft") uses a calm, natural palette — dark slate background (`#111827`), emerald primary (`#10B981`), mint accent (`#34D399`), on off-white text (`#F9FAFB`) — with a full light-mode counterpart using the same accent colours on a white/soft-grey base. Quicksand (display) and Nunito (body) give the UI a rounded, organic feel rather than a sharp corporate look. The logo is a leaf marked with vein-like waveform lines, tying the audio subject matter to the natural aesthetic. Product brand names (Fernline, Northgrove, Thicket, Mossline, Rootnote, Driftwood, Loam, Palewood) are original — no real-world trademarks are used, since presenting a class project as an authorized seller of real brands would misrepresent both the product photos and the brand relationship.

## Author

Tanish — B.Tech CSE (AI & ML), UIET, Kurukshetra University. Built under the mentorship of Dr. Ajay Jangra.
