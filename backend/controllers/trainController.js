const db = require('../config/db');

exports.addTrain = (req, res) => {
    const { apiKey, name, source, destination, totalSeats } = req.body;

    if (apiKey !== process.env.ADMIN_API_KEY) return res.status(403).json({ message: 'Unauthorized' });

    db.query('INSERT INTO trains (name, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)', 
    [name, source, destination, totalSeats, totalSeats], 
    (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: 'Train added successfully' });
    });
};

exports.updateTrain = (req, res) => {
    const { apiKey, name, source, destination, totalSeats, availableSeats } = req.body;
    const { trainId } = req.params;

    if (apiKey !== process.env.ADMIN_API_KEY) return res.status(403).json({ message: 'Unauthorized' });

    db.query(
        'UPDATE trains SET name = ?, source = ?, destination = ?, totalSeats = ?, availableSeats = ? WHERE trainId = ?',
        [name, source, destination, totalSeats, availableSeats, trainId],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Train not found' });
            }
            res.json({ message: `Train ${trainId} updated successfully!` });
        }
    );
};

exports.getTrains = (req, res) => {
    const { source, destination } = req.query;
    db.query('SELECT * FROM trains WHERE source = ? AND destination = ?', 
    [source, destination], 
    (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

exports.getAllTrains = (req, res) => {
    db.query('SELECT * FROM trains', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};
