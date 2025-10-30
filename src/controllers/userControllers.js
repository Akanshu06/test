const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signUp = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    if (email !== 'admin@codesfortomorrow.com' || password !== 'Admin123!@#') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: 1, email: 'admin@codesfortomorrow.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
}

module.exports = {signUp,login}