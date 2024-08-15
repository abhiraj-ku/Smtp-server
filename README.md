# SMTP Service with TOTP and Redis Cache

## Overview

This project is a custom-built SMTP service with TOTP-based authentication using Google Authenticator. It uses MongoDB for persistent storage and Redis as a caching layer.

## Features

- **SMTP Server**: Handles email sending and receiving.
- **TOTP Authentication**: Secure user login with 2FA using Google Authenticator.
- **Redis Caching**: Speeds up user lookup and reduces MongoDB load.
- **MongoDB Storage**: Stores registered users securely.

## Setup

1. **Clone the repo:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   ```env
   DB_URI=mongodb://localhost:27017/smtp_service
   REDIS_URL=redis://localhost:6379
   REDIS_PASSWORD=your_redis_password
   ```

4. **Start the server:**

   ```bash
   node server.js
   ```

## Usage

1. Register a user and get the TOTP QR code.
2. Authenticate using username, password, and TOTP token.

## Folder Structure

- **src/config**: Configuration files (MongoDB, Redis).
- **src/controllers**: User registration and authentication logic.
- **src/models**: MongoDB models.
- **src/routes**: API routes.
- **src/utils**: Utility functions.

## Deployment

Deploy the service on AWS using EC2 with Node.js, MongoDB, and Redis.
