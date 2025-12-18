// in root enter
// npm init -y
// npm install express cors bcryptjs jsonwebtoken

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For hashing
const jwt = require('jsonwebtoken'); // For tokens

const app = express();
app.use(express.json());
app.use(cors());

const users = []; // Mock Database

// REGISTER
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Security Step 1: Hash

    console.log("Original:", password, " | Hashed:", hashedPassword);
    users.push({ username, password: hashedPassword });
    res.json({ message: "Registered" });
});

// LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    // Security Step 2: Compare Hash
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ message: "Invalid" });
    }
    
    // Security Step 3: Give Token
    const token = jwt.sign({ username }, "secretKey"); 
    res.json({ token });
});

app.listen(3000);