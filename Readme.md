# 📚 Book Review API

A simple and secure RESTful API built with **Node.js**, **Express**, and **MongoDB**, designed to manage books and user reviews. Authenticated users can add books, submit one review per book, and update or delete their own reviews.

---

## 🚀 Features

* 🔐 User authentication via **JWT**
* 📘 CRUD operations for books
* 🔍 Search and filter books by author or genre
* ✍️ Add one review per book (authenticated users only)
* ✏️ Update/Delete your own reviews

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT** for authentication

---

## ⚙️ Setup Instructions

### 🔄 Clone the Repository

```bash
git clone https://github.com/PUNEET-EMM/Book-Review-API-.git

cd Book-Review-API-
```

### 📆 Install Dependencies

```bash
npm install
```

### 🧪 Configure Environment Variables

Create a `.env` file in the project root and add the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

### ▶️ Run the Application

```bash
npm start
```

---

## 📌 API Endpoints

### 🧑‍💻 Authentication

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/v1/auth/signup` | Register a new user       |
| POST   | `/api/v1/auth/login`  | Login and receive a token |

---

### 📚 Books

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| POST   | `/api/v1/books`               | Add a new book (auth required)      |
| GET    | `/api/v1/books`               | Retrieve all books (filterable)     |
| GET    | `/api/v1/books/:id`           | Get a specific book and its reviews |
| GET    | `/api/v1/books/search?query=` | Search books by title or author     |

---

### ✍️ Reviews

| Method | Endpoint                                | Description                          |
| ------ | --------------------------------------- | ------------------------------------ |
| POST   | `/api/v1/reviews/books/:bookId/reviews` | Submit a review (auth, one per book) |
| PUT    | `/api/v1/reviews/:reviewId`             | Update your review (auth required)   |
| DELETE | `/api/v1/reviews/:reviewId`             | Delete your review (auth required)   |

---

## 🔍 Example Requests (via `curl`)

### ✅ Register User

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
-H "Content-Type: application/json" \
-d '{"username": "john", "password": "secret"}'
```

### 📕 Add a Book

```bash
curl -X POST http://localhost:3000/api/v1/books \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title": "Clean Code", "author": "Robert Martin", "genre": "Programming"}'
```

### ⭐ Submit a Review

```bash
curl -X POST http://localhost:3000/api/v1/reviews/books/BOOK_ID/reviews \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Must read!"}'
```

---



## 📄 License

This project is licensed under the [MIT License](LICENSE).







