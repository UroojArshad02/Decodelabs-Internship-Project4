# Backend API Project

## Project Overview

This project is a Django REST Framework based Backend API with database integration.

The project provides APIs for managing users and supports CRUD operations, validation, authentication, authorization, and database management.

## Technologies Used

- Python
- Django
- Django REST Framework
- SQLite Database
- Django ORM
- Token Authentication
- drf-spectacular / Swagger

## Database

This project uses **SQLite** as its database.

The database file is:

`db.sqlite3`

Django ORM is used to communicate with the database. The application stores and retrieves data through Django models and API operations.

## CRUD Operations

The API supports the following operations:

- GET - Retrieve data
- POST - Create new data
- PUT - Update existing data
- DELETE - Delete data

## Authentication

Token-based authentication is implemented using Django REST Framework.

Authenticated users are required to access protected API endpoints.

## Authorization

Permissions are implemented to control access to protected API resources.

## Data Validation

Input data is validated through Django REST Framework serializers before being stored in the database.

## Database Security

Django ORM is used for database operations instead of directly constructing SQL queries.

This helps protect the application against SQL Injection attacks by safely handling database queries and parameters.

## Admin Panel

Django Admin Panel is included for managing database records through an administrative interface.

Admin credentials are not included in this repository for security reasons.

## API Documentation

API documentation is provided using Swagger/OpenAPI through drf-spectacular.

## Project Structure

```text
backend/
│
├── db.sqlite3
├── manage.py
├── requirements.txt
├── README.md
│
├──backend/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
└── users/
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    ├── admin.py
    └── migrations/