# 🎁 Gift Shop – Full Stack E-commerce Website

A full-stack e-commerce web application built using **React, Node.js, TypeScript, MySQL**, and **JWT authentication**.  
The project supports user authentication, product browsing, cart management, secure checkout, and order history.

---

## 🚀 Features

### 👤 Authentication
- User Signup & Login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes

### 🛍️ Shopping
- Product listing with images
- Add to cart with quantity management
- Cart total calculation
- Secure checkout

### 📦 Orders
- Order creation & persistence
- Order items stored relationally
- Order history for logged-in users

---

## 🛠 Tech Stack

**Frontend**
- React (JavaScript)
- Vite
- Axios

**Backend**
- Node.js
- Express
- TypeScript
- JWT Authentication

**Database**
- MySQL
- Relational schema (users, products, orders, order_items)

---
frontend/ → React application
backend/ → Node.js + Express API


---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev
🔐 Environment Variables
Create .env file in backend folder:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gift_shop_db
JWT_SECRET=your_secret

👨‍💻 Author

Rishab Malik
MCA (AI/ML) | Full Stack Developer


## 📂 Project Structure

