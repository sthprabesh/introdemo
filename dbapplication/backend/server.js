import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from "public" directory

// Connect to SQLite database
const db = new sqlite3.Database('users.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            sex TEXT NOT NULL
        )`);
    }
});

// Add a user
app.post('/add-user', (req, res) => {
    const { name, age, sex } = req.body;

    if (!name || !age || !sex) {
        return res.status(400).json({ error: 'Name, age, and sex are required.' });
    }

    const sql = `INSERT INTO users (name, age, sex) VALUES (?, ?, ?)`;
    db.run(sql, [name, age, sex], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Could not add user.' });
        }
        res.status(201).json({ message: 'User added', id: this.lastID });
    });
});

// Get all users
app.get('/get-users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users.' });
        }
        res.json(rows);
    });
});

// Update user
app.put('/update-user/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, sex } = req.body;

    if (!name || !age || !sex) {
        return res.status(400).json({ error: 'Name, age, and sex are required.' });
    }

    const sql = `UPDATE users SET name = ?, age = ?, sex = ? WHERE id = ?`;
    db.run(sql, [name, age, sex, id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Could not update user.' });
        }
        res.json({ message: 'User updated', id });
    });
});

// Delete user
app.delete('/delete-user/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: 'Could not delete user.' });
        }
        res.json({ message: 'User deleted', id });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
