# Alzikrayat — V2 MERN STACK 

Alzikrayat is a photo-sharing application rebuilt from the original PHP project using MongoDB, Express, React, and Node.js. It keeps the original archive idea and visual identity while moving the pages to a React frontend and the data operations to a REST API.

## Features

- Register and log in with bcrypt password hashing.
- Session-based login state and logout.
- Home page with recent memories.
- Photo gallery with 3-column, 4-column, list, and slider layouts.
- Photo upload with JPG, PNG, and WEBP validation (maximum 2MB).
- Photo detail page with metadata and comments.
- Logged-in users can comment on any photo.
- Only the photo owner can delete that photo; the API checks ownership before deletion.
- Responsive layout for desktop, tablet, and mobile.

## Project structure

```text
client/                 React + Vite frontend
  src/
    components/         Shared UI components
    context/            Login state
    pages/              Home, Gallery, Photo Detail, Login/Register, Upload
    services/           API requests
server/                 Express API
  config/               MongoDB connection
  controllers/          Request handling and application logic
  middleware/           Authentication, Joi validation, error handling
  models/               User, Photo, Comment schemas
  routes/               REST API routes
  uploads/               Uploaded image files
```

## Requirements

- Node.js 20 or later
- npm
- MongoDB running locally or a MongoDB Atlas database

## Installation

1. Clone the repository.
2. Install the root and application dependencies:

   ```bash
   npm install
   npm install --prefix server
   npm install --prefix client
   ```

3. Create `server/.env` from `server/.env.example` and set the MongoDB connection string and a long random session secret.
4. Start both applications from the repository root:

   ```bash
   npm run dev
   ```

5. Open the Vite address shown in the terminal (normally `http://localhost:5173`). The API runs on port 3000.

To start only one side, use `npm run dev:server` or `npm run dev:client`. To create a production frontend build, run `npm run build`.

## Environment variables

| Variable | Description |
| --- | --- |
| `PORT` | Express port (default: `3000`) |
| `NODE_ENV` | Set to `production` when deployed |
| `MONGODB_URI` | MongoDB connection string |
| `SESSION_SECRET` | Secret used to sign the session cookie |
| `CLIENT_URL` | Frontend origin allowed by CORS (default: `http://localhost:5173`) |

Never commit `server/.env`. The repository includes an example file only.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Log in |
| `GET` | `/api/auth/me` | Get the current session user |
| `POST` | `/api/auth/logout` | End the current session |
| `GET` | `/api/photos` | Get all photos |
| `GET` | `/api/photos/:id` | Get a photo and its comments |
| `POST` | `/api/photos` | Upload a photo (login required) |
| `DELETE` | `/api/photos/:id` | Delete an owned photo (login required) |
| `POST` | `/api/photos/:id/comments` | Add a comment (login required) |
| `GET` | `/api/health` | Check API status |

The frontend uses the Vite development proxy for `/api` and `/uploads`. The server uses an HTTP-only session cookie; passwords are never returned by the API. The Project 3 requirements do not require JWT authentication.

## Notes

- Uploaded files are stored in `server/uploads/`; the folder is kept in Git, but uploaded images are ignored.
- MongoDB stores photo and comment metadata. Deleting a photo also removes its comments and local image file.
- For deployment, configure HTTPS, a strong `SESSION_SECRET`, the correct `CLIENT_URL`, and persistent file storage or a cloud bucket.
