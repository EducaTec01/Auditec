const connection = require('../models/db')
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const consult = 'SELECT * FROM Login WHERE user = ? AND password = ?';

    try {
        connection.query(consult, [username, password], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error', details: err.message });
                return;
            }

            if (result && result.length > 0) {
                const token = jwt.sign({ username }, "Stack", {
                    expiresIn: '3m'
                });
                res.json({ token });
            } else {
                console.log('wrong user');
                res.status(401).json({ message: 'Wrong username or password' });
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error', details: e.message });
    }
}
