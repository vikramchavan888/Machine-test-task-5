# Middleware API

This project is an Express.js middleware that performs the following functions:

1. **Authenticates Incoming Requests** using JSON Web Tokens (JWT).
2. **Validates Request Payloads** to ensure data integrity.
3. **Forwards Requests** to another API endpoint using Axios.

## Features

- Built with Express.js
- JWT authentication for secure access
- Payload validation using `express-validator`
- API forwarding with Axios

---

## Prerequisites

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)

---

## Installation


 **Create an Environment File (.env):**
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   TARGET_API_URL=https://target-api.example.com/endpoint
   ```

---

## Usage

1. **Start the Server:**
   ```bash
   npm start
   ```
   By default, the server runs on `http://localhost:3000`.

2. **Endpoints:**
   - **POST** `/api/middleware-endpoint`

---

## Testing the Middleware with Postman

1. **Set the Request Method and URL:**
   - Method: `POST`
   - URL: `http://localhost:3000/api/middleware-endpoint`

2. **Add Request Headers:**
   - `Content-Type: application/json`
   - `Authorization: Bearer <your_valid_jwt>` (replace `<your_valid_jwt>` with a valid JWT token.)

3. **Add a Request Body:**
   - In Postman, go to the `Body` tab, select `raw`, and choose `JSON`.
   - Example payload:
     ```json
     {
       "data": {
         "exampleKey": "exampleValue"
       }
     }
     ```

4. **Send the Request:**
   - You should receive one of the following responses:
     - **Success (200):** Forwarded response from the target API.
     - **Unauthorized (401/403):** Invalid or missing JWT.
     - **Bad Request (400):** Validation errors in the payload.

---



