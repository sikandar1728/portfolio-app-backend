require('dotenv').config();
const express = require('express');
const { connectDatabase } = require('./configurations/dbconfig')
const workExperience = require('./routers/workExperience')
const cors = require('cors')

const SERVER_PORT = process.env.SERVER_PORT

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5500" }))
app.use('/api/portfolio', workExperience);

connectDatabase();

app.get('/', (req, res) => {
    res.json({ message: 'Request Arrived....' });
})

app.listen(SERVER_PORT, (req, res) => {
    console.log('Server is running on port', SERVER_PORT)
})