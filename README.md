# 💬 Chatify

> 🚧 **This project is currently under active development. Features and documentation may change over time.**

A modern real-time chat application that enables users to communicate instantly with secure authentication, live messaging, and media support.

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 💬 Real-time Messaging with Socket.IO
- 👤 User Profiles
- 🖼️ Profile Image Upload (Cloudinary)
- 📧 Email Verification
- 🔒 Protected Routes
- 📱 Responsive UI
- ⚡ Fast & Smooth User Experience

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- Zustand
- Socket.IO Client
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- bcryptjs
- Cloudinary
- Resend (Email Service)

---

## 📂 Project Structure

```
chatify/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── lib/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/satish8288/chatify.git
```

### Install Backend

```bash
cd backend
npm install
```

### Install Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RESEND_API_KEY=your_resend_api_key

CLIENT_URL=http://localhost:5173
```

---

## ▶️ Run the Project

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

## 📌 Roadmap

- ✅ Authentication
- ✅ Real-time Chat
- ✅ Send Welcome Email 
- ✅ Profile Management
- ✅ Image Sharing
- 🚧 Voice Messages
- 🚧 Group Chats
- 🚧 Read Receipts
- 🚧 Notifications

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

---

## 👨‍💻 Author

**Satish Bhardwaj**

GitHub: https://github.com/satish8288

---

## ⭐ Support

If you like this project, don't forget to **star** the repository.
