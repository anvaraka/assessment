const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

// Dummy database to store users
const users = [];

// Middleware
app.use(express.json());
app.use(cors());

// Secret key for JWT
const JWT_SECRET = '123456789';

// Middleware to verify JWT token and extract user's email
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
};

// Route for user registration
app.post('/api/signup', async (req, res) => {
    try {
        const { name, surname, email, password } = req.body;

        // Validate user input
        if (!name || !surname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the email already exists in the database
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the new user to the database
        users.push({ name, surname, email, password: hashedPassword });

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for user authentication
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email in the database
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare hashed password with the provided password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token for authentication
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for retrieving user information
app.get('/api/user', authenticateToken, async (req, res) => {
    try {
        // Extract email from JWT payload
        const { email } = req.user;

        // Find user by email in the database
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user information
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user information:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/homepage', (req, res) => {
    try {
        // You can fetch these values from database
        const price = "$1,600";
        const bonusText = "Deposit Bonus";

        return res.status(200).json({ price, bonusText });
    } catch (error) {
        console.error('Error fetching home page text:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
