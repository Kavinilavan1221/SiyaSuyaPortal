# Siya Suya Portal

Siya Suya Portal is a premium, full-stack B2B e-commerce and corporate website designed for Siya Suya International, a global supplier of sustainably sourced, high-quality Sri Lankan seafood. 

The platform consists of a modern, glassmorphic frontend built with React (Vite) and Tailwind CSS, alongside a robust Node.js backend using Express and MongoDB. It features a complete Admin Dashboard for managing products and customer quote requests.

## 🌟 Key Features

### Public Facing Website
- **Modern UI/UX**: Premium, glassmorphic aesthetic with dark mode support.
- **Product Catalog**: Beautiful presentation of seafood products including weights and details.
- **Contact & Inquiry**: Integrated `mailto:` forms for instant direct-to-inbox messaging without SMTP overhead.
- **Role-Based Auth & Redirection**: Seamless login experience that detects user roles and redirects intelligently.

### Admin Dashboard (CMS)
- **Master Admin Bypass**: Hardcoded, unbreakable fallback for super administrators (`admin123@gmail.com`).
- **Product Management**: Full CRUD operations to add, edit, or delete seafood products dynamically.
- **Inquiry Management**: A dedicated inbox to review, track, and manage incoming customer quotation requests.
- **Session Security**: JWT-based authentication and secure session termination.

## 🛠 Tech Stack

**Frontend:**
- React 18 (Vite)
- Tailwind CSS
- shadcn/ui & Radix UI Primitives
- React Router DOM
- React Hook Form & Zod (Validation)
- Lucide React (Icons)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (NoSQL Database)
- JSON Web Token (JWT Auth)
- bcryptjs (Password Hashing)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- MongoDB (Atlas or Local)

### 1. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure your `.env` file is properly configured with your MongoDB URI and JWT Secret:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/siyasuya?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the project root:
   ```bash
   cd SiyaSuyaPortal-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser.

## 👨‍💻 Admin Access
To access the Admin Dashboard, use the master override credentials:
- **Email:** `admin123@gmail.com`
- **Password:** `admin123`

## 📄 License
This project is proprietary and built specifically for Siya Suya International.
