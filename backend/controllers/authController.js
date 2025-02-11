const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { username, password, isAdmin } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)', 
    [username, hashedPassword, isAdmin], 
    (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'User registered successfully' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
};
