# 🚆 Railway Reservation System

A **Node.js + MySQL** powered **Railway Reservation System** with **JWT authentication**, **Admin functionalities**, and **ACID-compliant seat booking**.

---

## 🚀 Features
- User registration & login with **bcrypt password hashing**.
- **JWT authentication** for secure access.
- **Admin functionalities**: Add/update train details.
- **Train search**: Find trains between source & destination.
- **Seat booking with ACID compliance**.
- User booking history retrieval.

---

## 📌 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT, bcrypt.js
- **Security:** dotenv, CORS

---

## 🔧 Installation & Setup

### 1️⃣ Clone Repository
```sh
git clone https://github.com/your-username/railway-reservation-system.git
cd railway-reservation-system
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Configure Environment Variables
Create a **.env** file in the root directory and add:
```sh
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=railway_system
JWT_SECRET=yourjwtsecret
ADMIN_API_KEY=mysecureadminkey
```

### 4️⃣ Setup Database
Create a MySQL database and run the following SQL commands:
```sql
CREATE DATABASE railway_system;
USE railway_system;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT 0
);

CREATE TABLE trains (
    trainId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    totalSeats INT NOT NULL,
    availableSeats INT NOT NULL
);

CREATE TABLE bookings (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    trainId INT NOT NULL,
    seatNumber INT NOT NULL,
    bookingTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (trainId) REFERENCES trains(trainId),
    UNIQUE (trainId, seatNumber) -- Ensures one seat cannot be booked twice
);

SELECT user, host, plugin FROM mysql.user WHERE user = 'root';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ParleG@10';
FLUSH PRIVILEGES;
```

### 5️⃣ Start the Server
```sh
npm start
```
Server runs on `http://localhost:5000`

---

## 🔄 API Endpoints

### **1️⃣ User Authentication**
#### ➤ Register a User
```sh
POST /api/auth/register
```
**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword",
  "isAdmin": false
}
```

#### ➤ Login User
```sh
POST /api/auth/login
```
**Response:**
```json
{
  "token": "your_generated_jwt_token"
}
```

---

### **2️⃣ Admin Functionalities**
#### ➤ Add a Train
```sh
POST /api/trains/admin/add-train
```
**Body:**
```json
{
  "apiKey": "mysecureadminkey",
  "name": "Express 101",
  "source": "Delhi",
  "destination": "Mumbai",
  "totalSeats": 100
}
```

#### ➤ Update Train Details
```sh
PUT /api/trains/admin/update-train/:trainId
```

---

### **3️⃣ Train Search**
#### ➤ Get Trains Between Two Cities
```sh
GET /api/trains?source=Delhi&destination=Mumbai
```

#### ➤ Get All Trains
```sh
GET /api/trains/all
```

---

### **4️⃣ Seat Booking (Authenticated Users)**
#### ➤ Book a Seat
```sh
POST /api/bookings/book-seat
```
**Body:**
```json
{
  "token": "your_generated_jwt_token",
  "trainId": 1,
  "seatNumber": 10
}
```

#### ➤ Get User Bookings
```sh
GET /api/bookings/user/bookings
```
**Headers:**
```sh
Authorization: Bearer your_generated_jwt_token
```

---

## 🤝 Contributing
1. **Fork** the repository.
2. **Clone** your fork.
3. **Create a branch** (`git checkout -b feature-branch`)
4. **Commit changes** (`git commit -m "Added new feature"`)
5. **Push** to your fork (`git push origin feature-branch`)
6. **Submit a PR** 🚀

---

## 📜 License
MIT License. Free to use and modify! 🎉

---

## ⭐ Show Support
Give a ⭐ if you like this project!

