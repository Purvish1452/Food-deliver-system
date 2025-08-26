# 🍔 Food Delivery System

A full-stack **Food Delivery System** where users can browse food items, add them to their cart, place orders, and admins can manage menu items.

---

## 🚀 Features

### 👤 User Side
- 🔐 User authentication (Login/Register)
- 🍽️ Browse food items by categories
- 🛒 Add to cart & place orders
- 💳 Payment gateway integration (COD / Online Payment)
- 📦 Track order status

### 🛠️ Admin Side
- ➕ Add / Update / Delete food items
- 📂 Manage categories
- 📑 View and manage orders
- 👥 Manage users

---

## 🏗️ Tech Stack

- **Frontend:** React.js / Vite, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Image Uploads:** Multer
- **Authentication:** JWT (JSON Web Token)
- **Payment Gateway:** (e.g., Stripe / Razorpay / Cash on Delivery)

---

## 📂 Project Structure

food-delivery-system/
│-- client/ # Frontend (React + Vite)
│-- server/ # Backend (Node + Express)
│-- uploads/ # Food images
│-- models/ # Mongoose models
│-- routes/ # API routes
│-- controllers/ # Business logic
│-- .env # Environment variables
│-- package.json
│-- README.md


---

## ⚙️ Installation & Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/food-delivery-system.git
   cd food-delivery-system
   ```
   
2. **Install dependencies**

For backend  
```bash
cd server
npm install
```


For frontend
```bash
cd client
npm install
```

3.**Setup environment variables (server/.env)**
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4.**Run the project**

Start backend
```bash
cd server
npm run dev
```

Start frontend
```bash
cd client
npm run dev
```





