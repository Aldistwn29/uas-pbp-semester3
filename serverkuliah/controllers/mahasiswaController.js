const express = require('express');
const router = express.Router();
const db = require('../models/db');

//GET/mahasiswa
router.get('/', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa', error);
            res.status(500).json({ message: 'Internal Server Error'});
        } else {
            res.json(results);
        }
    });
});

//GET/mahasiswa/:nim
router.get('/:nim', (req, res) => {
    const mahasiswald = req.params.nim;
    db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswald], (error, results) => {
        if (error) {
            console.error('Error fetching mahasiswa:', error);
            res.status(500).json({message: 'Internal not found'});
        } else if (results.length === 0){
            res.status(404).json({message: 'Mahasiswa not found'});            
        } else {
            res.json(results[0]);
        }
    });
});

//PUT/mahasiswa/:nim
router.put('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    const { nama, gender, prodi, alamat } = req.body;
    const updateQuery = 'UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?';

    console.log('Received PUT request with data:', { nama, gender, prodi, alamat, mahasiswaNim });

    db.query(updateQuery, [nama, gender, prodi, alamat, mahasiswaNim], (error) => {
        if (error) {
            console.error('Error updating mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'Data mahasiswa berhasil diperbarui' });
        }
    });
});

// POST /mahasiswa
router.post('/', (req, res) => {
    const { nim, nama, gender, prodi, alamat } = req.body;
    const insertQuery = 'INSERT INTO mahasiswa (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)';

    db.query(insertQuery, [nim, nama, gender, prodi, alamat], (error) => {
        if (error) {
            console.error('Error creating mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'Mahasiswa created successfully' });
        }
    });
});

// DELETE /mahasiswa/:nim
router.delete('/:nim', (req, res) => {
    const mahasiswaNim = req.params.nim;
    const deleteQuery = 'DELETE FROM mahasiswa WHERE nim = ?';

    db.query(deleteQuery, [mahasiswaNim], (error) => {
        if (error) {
            console.error('Error deleting mahasiswa:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        } else {
            res.json({ success: true, message: 'Mahasiswa deleted successfully' });
        }
    });
});


module.exports = router;