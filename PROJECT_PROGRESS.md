# Alzikrayat MERN — Project Progress

## Goal
Rebuild the original Alzikrayat PHP photo-sharing application as a MERN application while following the Project 3 specification and the course material in Lectures 11–15.

## Sources reviewed
- `Project_3_Alzikrayat_MERN_Specification.pdf`
- `Project_3_Alzikrayat_a_Photo_Sharing_Application_Design_implement.pdf`
- `11-15.zip`: Lectures 11, 12, 13, 14, and 15
- Original repository: `Omer-Alzain/Alzikrayat`

## Decisions
- Frontend: React with Vite and React Router.
- Backend: Node.js and Express, organized into routes, controllers, middleware, and models.
- Database: MongoDB with Mongoose User, Photo, and Comment schemas.
- Validation: Joi at the API boundary and Mongoose schema validation at the data layer.
- Passwords: bcrypt hashes.
- Basic authentication: server-side sessions stored in MongoDB; no JWT because it is not required for Project 3.
- Uploads: Multer stores JPG, PNG, and WEBP files in `server/uploads/` with a 2MB limit.
- Photo deletion checks ownership on the server and removes associated comments and the image file.
- Frontend API calls use `fetch`, `useEffect`, `useState`, React Router, and a shared Auth Context.
- Original Alzikrayat colors, typography, logo treatment, navigation, archive language, and gallery layout choices are retained.

## Implemented
- [x] Initial repository README and project structure
- [x] Express server, MongoDB connection, and session setup
- [x] User, Photo, and Comment Mongoose models
- [x] Joi validation middleware and authentication middleware
- [x] Registration, login, current-user, and logout endpoints
- [x] Photo list, detail, upload, and owner-only delete endpoints
- [x] Comment creation endpoint
- [x] React app shell, API helper, and authentication context
- [x] Navbar, footer, photo card, and loading component
- [x] Home, gallery layouts, photo detail, login/register, and upload pages
- [x] Responsive styling based on the original PHP project

## Remaining
- [ ] Review all generated source files and correct any integration issues
- [ ] Install dependencies and run backend/frontend locally
- [ ] Test registration, login, session persistence, upload, deletion ownership, and comments against MongoDB
- [ ] Verify client production build
- [ ] Complete any fixes found during testing
- [ ] Finalize README and submission notes

## Commit history note
The requested work sequence is organized from 9 November onward. Git commit timestamps are kept truthful and reflect when commits are actually created; no commits are backdated.
