const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000
//middleware 
app.use(cors());
app.use(express.json());
//connect with mong db 
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lt029.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    await client.connect();
    const database = client.db('doctors-portal');
    const appointmentsCollection = database.collection('appointments');
    app.get('/appointments', async (req, res) => {

    });
    app.post('/appointments', async (req, res) => {

    })
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hello doctors');
});

app.listen(port, () => {
    console.log('listening to the port ', port)
});



