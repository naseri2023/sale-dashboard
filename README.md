# Sales Analytics Dashboard

A web dashboard for visualizing sales data. Built with MongoDB, Express, React, and Node.js.

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
**Frontend:** React (Vite), React Router, Recharts, Tailwind CSS, Axios

## Setup

### Backend
```bash
cd backend
npm install
```

Seed the database (run once):
```bash
node scripts/seed.js         # imports sales data from CSV
node scripts/seedAdmin.js    # creates the admin user
```

Start the server (port 8000):
```bash
node server.js
```

### 3. Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

### 4. Login
Go to `http://localhost:5173` — you'll land on `/login`.

- Username: `admin`
- Password: `new`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate and receive a JWT |
| GET | `/sales` | List sales (supports `startDate`, `endDate`, `productId`, `hasDiscount` query params) |
| GET | `/sales/kpi/total-profit` | Total profit across all sales |
| GET | `/sales/kpi/total-sale` | Total sales amount |
| GET | `/sales/kpi/top-product` | Top 5 products by quantity sold |
| GET | `/sales/kpi/top-discount` | Top 5 products by max discount |
| GET | `/sales/kpi/by-category` | Sales grouped by product category (supports date filter) |
| GET | `/sales/kpi/by-region` | Sales grouped by region |
| GET | `/sales/kpi/region-category` | Sales grouped by region and category (for stacked chart + table) |

## Data Source

Data from [Kaggle](https://www.kaggle.com/datasets/vinothkannaece/sales-dataset), cleaned and validated before seeding.
