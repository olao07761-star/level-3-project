const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');



const userModel = require("./model/user.model");
const deviceModel = require("./model/device.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL || process.env.URL
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        const isVercelOrigin = origin && /https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);

        if (!origin || allowedOrigins.includes(origin) || isVercelOrigin) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json());


const startServer = async () => {
    if (!MONGO_URL) {
        console.error('DB failed to connect: MONGO_URL is missing in Backend/.env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000,
            socketTimeoutMS: 45000,
            retryWrites: true,
        });

        console.log('DB connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('DB failed to connect:', error.message);

        if (error.message && error.message.toLowerCase().includes("isn't whitelisted")) {
            console.error('MongoDB Atlas network issue: add your current IP in Atlas Network Access or allow 0.0.0.0/0 for development.');
        }

        console.error('Retrying MongoDB connection in 5 seconds...');
        setTimeout(startServer, 5000);
    }
};





app.get('/', (req, res) => {
    res.send('Hello World!');
});








// Sign up

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({
                status: false,
                message: "Please fill in all required fields: firstName, lastName, email, password",
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({
                status: false,
                message: "Please provide a valid email address",
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).send({
                status: false,
                message: "Password must be at least 8 characters long",
            });
        }

        // Normalize inputs
        const normalizedEmail = email.trim().toLowerCase();
        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();

        // Check for duplicate email
        const existingUser = await userModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).send({
                status: false,
                message: "An account with this email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new userModel({
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        await newUser.save();

        // Generate token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(201).send({
            status: true,
            message: "User registered successfully",
            token,
            data: {
                firstName: trimmedFirstName,
                lastName: trimmedLastName,
                email: normalizedEmail,
                role: newUser.role,
            },
        });
    } catch (err) {
        // Handle duplicate email at DB level as a fallback
        if (err.code === 11000) {
            return res.status(409).send({
                status: false,
                message: "An account with this email already exists",
            });
        }

        console.error("Error during sign up:", err);
        return res.status(500).send({
            status: false,
            message: "Error registering user",
            error: err.message,
        });
    }
};

// Login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).send({
                status: false,
                message: "Please provide both email and password",
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Find user
        const existingUser = await userModel.findOne({ email: normalizedEmail });
        if (!existingUser) {
            return res.status(401).send({
                status: false,
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password,
            existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                status: false,
                message: "Invalid email or password",
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).send({
            status: true,
            message: "Login successful",
            token,
            data: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                role: existingUser.role,
            },
        });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).send({
            status: false,
            message: "Error logging in",
            error: err.message,
        });
    }
};

// Auth routes
app.post('/api/signup', signUp);
app.post('/api/login', login);

// Device CRUD routes

// Get all devices
app.get('/api/devices', async (req, res) => {
    try {
        const devices = await deviceModel.find().sort({ createdAt: -1 });
        return res.status(200).send({
            status: true,
            data: devices
        });
    } catch (err) {
        console.error("Error fetching devices:", err);
        return res.status(500).send({
            status: false,
            message: "Error fetching devices",
            error: err.message
        });
    }
});

// Get single device
app.get('/api/devices/:id', async (req, res) => {
    try {
        const device = await deviceModel.findById(req.params.id);
        if (!device) {
            return res.status(404).send({
                status: false,
                message: "Device not found"
            });
        }
        return res.status(200).send({
            status: true,
            data: device
        });
    } catch (err) {
        console.error("Error fetching device:", err);
        return res.status(500).send({
            status: false,
            message: "Error fetching device",
            error: err.message
        });
    }
});

// Create device
app.post('/api/devices', async (req, res) => {
    try {
        const { name, image, color, storage, condition, marketValue, tradeInValue, trend, availability, availabilityColor } = req.body;

        // Validate required fields
        if (!name || !image || !color || !storage || !condition || !marketValue || !tradeInValue || !trend || !availability || !availabilityColor) {
            return res.status(400).send({
                status: false,
                message: "Please fill in all required fields"
            });
        }

        const newDevice = new deviceModel({
            name,
            image,
            color,
            storage,
            condition,
            marketValue,
            tradeInValue,
            trend,
            availability,
            availabilityColor
        });

        await newDevice.save();

        return res.status(201).send({
            status: true,
            message: "Device created successfully",
            data: newDevice
        });
    } catch (err) {
        console.error("Error creating device:", err);
        return res.status(500).send({
            status: false,
            message: "Error creating device",
            error: err.message
        });
    }
});

// Update device
app.put('/api/devices/:id', async (req, res) => {
    try {
        const { name, image, color, storage, condition, marketValue, tradeInValue, trend, availability, availabilityColor } = req.body;

        const updatedDevice = await deviceModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                image,
                color,
                storage,
                condition,
                marketValue,
                tradeInValue,
                trend,
                availability,
                availabilityColor,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!updatedDevice) {
            return res.status(404).send({
                status: false,
                message: "Device not found"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Device updated successfully",
            data: updatedDevice
        });
    } catch (err) {
        console.error("Error updating device:", err);
        return res.status(500).send({
            status: false,
            message: "Error updating device",
            error: err.message
        });
    }
});

// Delete device
app.delete('/api/devices/:id', async (req, res) => {
    try {
        const deletedDevice = await deviceModel.findByIdAndDelete(req.params.id);

        if (!deletedDevice) {
            return res.status(404).send({
                status: false,
                message: "Device not found"
            });
        }

        return res.status(200).send({
            status: true,
            message: "Device deleted successfully",
            data: deletedDevice
        });
    } catch (err) {
        console.error("Error deleting device:", err);
        return res.status(500).send({
            status: false,
            message: "Error deleting device",
            error: err.message
        });
    }
});

startServer();