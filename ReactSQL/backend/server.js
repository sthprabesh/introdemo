import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'users.db'
});

// Define User Model
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

// Sync Database
sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Error initializing database:', err));

// Add a user
app.post('/add-user', async (req, res) => {
    try {
        const { name, age, sex } = req.body;
        if (!name || !age || !sex) {
            return res.status(400).json({ error: 'Name, age, and sex are required.' });
        }

        const user = await User.create({ name, age, sex });
        res.status(201).json({ message: 'User added', id: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Could not add user.' });
    }
});

// Get all users
app.get('/get-users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

// Update user
app.put('/update-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, sex } = req.body;

        if (!name || !age || !sex) {
            return res.status(400).json({ error: 'Name, age, and sex are required.' });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.update({ name, age, sex });
        res.json({ message: 'User updated', id });
    } catch (error) {
        res.status(500).json({ error: 'Could not update user.' });
    }
});

// Delete user
app.delete('/delete-user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.destroy();
        res.json({ message: 'User deleted', id });
    } catch (error) {
        res.status(500).json({ error: 'Could not delete user.' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
