# 📚 Book Review API

A simple RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing books and user reviews. Authenticated users can add books, write review book, and update or delete their own reviews.

---

## 🚀 Features

* User authentication using **JWT**
* Add, view, search books with optional filters
* Leave one review per book (authenticated users only)
* Update/delete your own review

---

## 🔧 Tech Stack

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT for authentication

---


## Clone

```bash
git clone repo name
```

## 📦 Installation

```bash
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the root with the following:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

---

## 📌 API Endpoints

### 🧑 Auth

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/v1/auth/signup | Register new user   |
| POST   | /api/v1/auth/login  | Login and get token |

---

### 📘 Books

| Method | Endpoint                 | Description                            |
| ------ | ------------------------ | -------------------------------------- |
| POST   | /api/v1/books               | Add new book (auth required)           |
| GET    | /api/v1/books               | Get all books (filter by author/genre) |
| GET    | /api/v1/books/:id          | Get book details w/ reviews            |
| GET    | /api/v1/books/search?query= | Search books by title or author        |

---

### ✍️ Reviews

| Method | Endpoint                            | Description                     |
| ------ | ----------------------------------- | ------------------------------- |
| POST   | /api/v1/reviews/books/:bookId/reviews | Add review (auth, one per book) |
| PUT    | /api/v1/reviews/:reviewId     | Update own review (auth)        |
| DELETE | /api/v1/reviews/:reviewId     | Delete own review (auth)        |

---

## 🧪 Example Requests (with `curl`)

### Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username": "john", "password": "secret"}'
```

### Add a Book

```bash
curl -X POST http://localhost:3000/api/books \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"title": "Clean Code", "author": "Robert Martin", "genre": "Programming"}'
```

### Submit Review

```bash
curl -X POST http://localhost:3000/api/reviews/books/BOOK_ID/reviews \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{"rating": 5, "comment": "Must read!"}'
```

---

## 🧱 Sample MongoDB Schema

### User

```js
username: String (unique)
password: String (hashed)
```

### Book

```js
title: String
author: String
genre: String
reviews: [ObjectId] (refs to Review)
```

### Review

```js
user: ObjectId (ref to User)
book: ObjectId (ref to Book)
rating: Number (1-5)
comment: String
```

---


