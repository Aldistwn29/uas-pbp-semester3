const express = require('express');
const router = express.Router();
const db = require('../models/db');

//GET/dosen
router.get('/', (req, res) => {
    db.query('SELECT * FROM dosen', (error, results) => {
        if (error) {
            console.error('Error fetching dosen', error);
            res.status(500).json({ message: 'Internal Server Error'});
        } else {
            res.json(results);
        }
    });
});

//GET/dosen/:nidn
router.get('/:nidn', (req, res) => {
    const dosenId = req.params.nidn;
    db.query('SELECT * FROM dosen WHERE nidn = ?', [dosenId], (error, results) => {
        if (error) {
            console.error('Error fetching dosen:', error);
            res.status(500).json({message: 'Internal not found'});
        } else if (results.length === 0){
            res.status(404).json({message: 'dosen not found'});            
        } else {
            res.json(results[0]);
        }
    });
});

//PUT/dosen/:nidn
router.put('/:nidn', (req, res) => {
    const dosenNidn = req.params.nidn;
    const { nama, gender, prodi, matkul, alamat } = req.body;
    const updateQuery = 'UPDATE dosen SET nama = ?, gender = ?, prodi = ?, matkul = ?, alamat = ? WHERE nidn = ?';

    console.log('Received PUT request with data:', { nama, gender, prodi, matkul, alamat, dosenNidn });

    db.query(updateQuery, [nama, gender, prodi, alamat, matkul, dosenNidn], (error) => {
        if (error) {
            console.error('Error updating dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'Data dosen berhasil diperbarui' });
        }
    });
});

// POST /dosen
router.post('/', (req, res) => {
    const { nidn, nama, gender, prodi, matkul, alamat } = req.body;
    const insertQuery = 'INSERT INTO dosen (nidn, nama, gender, prodi, matkul, alamat) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(insertQuery, [nidn, nama, gender, prodi, matkul, alamat], (error) => {
        if (error) {
            console.error('Error creating dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'dosen created successfully' });
        }
    });
});

// DELETE /dosen/:nidn
router.delete('/:nidn', (req, res) => {
    const dosenNidn = req.params.nidn;
    const deleteQuery = 'DELETE FROM dosen WHERE nidn = ?';

    db.query(deleteQuery, [dosenNidn], (error) => {
        if (error) {
            console.error('Error deleting dosen:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'dosen deleted successfully' });
        }
    });
});


module.exports = router;