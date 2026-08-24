# Backend API Project

A RESTful Backend API developed using **Django** and **Django REST Framework**. This project provides user management functionality with CRUD operations, authentication, authorization, validation, API documentation, and SQLite database integration.

## 🚀 Technologies Used

* Python 3.14.7
* Django 6.1
* Django REST Framework 3.18.0
* drf-spectacular
* SQLite3
* Token Authentication
* HTML, CSS, JavaScript (Frontend)

## 📁 Project Structure

```text
Backend-API-Project/
│
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── backend/
│   └── users/
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── css/
│   │   ├── style.css
│   │   └── dashboard.css
│   └── js/
│       └── dashboard.js
│
└── README.md
```

## ✨ Features

* User CRUD operations
* GET users
* Create users using POST
* Update users using PUT
* Delete users using DELETE
* Input validation
* Token-based authentication
* Permission-based authorization
* Django Admin Panel
* API documentation using Swagger/OpenAPI
* SQLite database integration
* Frontend interface for interacting with the backend API

## 🔐 Authentication

The API uses **Token Authentication** provided by Django REST Framework.

Users must provide a valid authentication token to access protected API endpoints.

## 📚 API Documentation

API documentation is provided using **drf-spectacular** and Swagger UI.

The Swagger documentation allows users to view and test the available API endpoints.

## 🗄️ Database

The project uses **SQLite3** as its database.

The database file is included in the repository:

```text
backend/db.sqlite3
```

## ▶️ How to Run the Project

### 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

### 2. Open the Project Directory

```bash
cd Backend-API-Project
```

### 3. Create and Activate Virtual Environment

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Start the Django Server

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000/
```

## 🧪 API Testing

The API can be tested using tools such as:

* Postman
* Swagger UI
* Browser for GET requests

The project supports testing of authentication, CRUD operations, validation, and authorization.

## 👨‍💻 Project Purpose

The purpose of this project is to demonstrate practical knowledge of **Django REST Framework**, backend API development, database integration, authentication, authorization, validation, and frontend-backend integration.

## 📌 Project Status

**Completed**

The project includes the required backend API functionality, database integration, authentication, authorization, frontend interface, API documentation, and testing.

---

**Developed as a Backend API Project using Django REST Framework.**
