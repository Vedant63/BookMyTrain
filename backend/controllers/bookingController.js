const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.bookSeat = (req, res) => {
    const { token, trainId, seatNumber } = req.body;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        db.beginTransaction(err => {
            if (err) return res.status(500).json({ message: err.message });

            db.query('SELECT availableSeats FROM trains WHERE trainId = ? FOR UPDATE', [trainId], (err, results) => {
                if (err) return db.rollback(() => res.status(500).json({ message: err.message }));

                if (results.length === 0 || results[0].availableSeats <= 0) {
                    return db.rollback(() => res.status(400).json({ message: 'No seats available' }));
                }

                db.query('UPDATE trains SET availableSeats = availableSeats - 1 WHERE trainId = ?', [trainId], (err) => {
                    if (err) return db.rollback(() => res.status(500).json({ message: err.message }));

                    db.query('INSERT INTO bookings (userId, trainId, seatNumber) VALUES (?, ?, ?)', 
                    [user.id, trainId, seatNumber], (err) => {
                        if (err) return db.rollback(() => res.status(500).json({ message: err.message }));

                        db.commit(err => {
                            if (err) return db.rollback(() => res.status(500).json({ message: err.message }));
                            res.json({ message: 'Seat booked successfully' });
                        });
                    });
                });
            });
        });

    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

exports.getUserBookings = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Authorization token required' });

    const token = authHeader.split(' ')[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        db.query('SELECT b.bookingId, t.name AS trainName, b.seatNumber, b.bookingTime FROM bookings b INNER JOIN trains t ON b.trainId = t.trainId WHERE b.userId = ?', 
        [user.id], 
        (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json(results);
        });

    } catch {
        res.status(403).json({ message: 'Invalid token' });
    }
};
