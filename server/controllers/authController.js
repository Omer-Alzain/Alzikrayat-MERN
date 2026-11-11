import bcrypt from 'bcrypt';
import User from '../models/User.js';

const publicUser = (user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    description: user.description,
    occupation: user.occupation
});

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, location, description, occupation } = req.body;
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            location,
            description,
            occupation
        });

        req.session.userId = user._id.toString();
        res.status(201).json({ message: 'Account created successfully.', user: publicUser(user) });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        req.session.userId = user._id.toString();
        res.json({ message: 'Login successful.', user: publicUser(user) });
    } catch (error) {
        next(error);
    }
};

const me = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(200).json({ user: null });
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            req.session.destroy(() => {});
            return res.status(200).json({ user: null });
        }

        res.json({ user: publicUser(user) });
    } catch (error) {
        next(error);
    }
};

const logout = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) return next(error);
        res.clearCookie('alzikrayat.sid');
        res.json({ message: 'Logged out successfully.' });
    });
};

export { register, login, me, logout };
