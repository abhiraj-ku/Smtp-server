# SMTP Service with TOTP and Redis Cache

## Overview

This project is a custom-built SMTP service featuring TOTP-based authentication using Google Authenticator. It leverages MongoDB for persistent storage and Redis as a caching layer to improve performance.

## Features

- **SMTP Server**: Handles email sending and receiving with SSL/TLS security.
- **TOTP Authentication**: Implements 2FA using Google Authenticator.
- **Redis Caching**: Speeds up user lookup and reduces MongoDB load.
- **MongoDB Storage**: Stores registered users securely.

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>`

   ```

2. **Install dependencies:**
   `npm install`
3. **Create a `.env` file:**

   `DB_URI=mongodb://localhost:27017/smtp_service`

   `REDIS_URL=redis://localhost:6379 `

   `REDIS_PASSWORD=your_redis_password `

4. **Start the server:**

   `node src/server/index.js`

## Usage

1.  **Register a user**: Register a new user and get the TOTP QR code for Google Authenticator.
2.  **Authenticate**: Log in using the username, password, and TOTP token.

## Folder Structure

markdown

Copy code

project-root/
│
├── src/
│ ├── config/ # Configuration files (MongoDB, Redis)
│ ├── controllers/ # Application logic (auth, SMTP)
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── server/ # Server setup (Express, SMTP)
│ ├── utils/ # Utility functions (QR code generation)
│ ├── keys/ # SSL/TLS keys and certificates
│ └── app.js # Main Express app
│
├── .env # Environment variables
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## Deployment

Deploy the service on AWS using EC2 with Node.js, MongoDB, and Redis. Ensure proper security and scalability configurations are set up.
