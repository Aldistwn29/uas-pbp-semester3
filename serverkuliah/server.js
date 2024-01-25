const express = require('express');
const bodyParser = require('body-parser');
const mahasiswaController = require('./controllers/mahasiswaController');
const dosenController = require('./controllers/dosenController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/mahasiswa', mahasiswaController);
app.use('/dosen', dosenController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});