import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'node:path';
import { mkdirSync } from 'node:fs';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import errorHandler from './middleware/errorHandler.js';

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing. Add it to server/.env.');
}
if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is missing. Add it to server/.env.');
}

const app = express();
const PORT = process.env.PORT || 3000;
const uploadDirectory = path.join(process.cwd(), 'uploads');
mkdirSync(uploadDirectory, { recursive: true });

if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'alzikrayat.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 60 * 60 * 24 * 7
    }),
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

app.use('/uploads', express.static(uploadDirectory));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/photos', commentRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found.' }));
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Could not start the server:', error.message);
        process.exit(1);
    }
};

startServer();
