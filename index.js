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
    const usersCollection = database.collection('users');
    // get all the appointments 
    // app.get('/appointments', async (req, res) => {
    //     const result = appointmentsCollection.find({}).toArray();
    //     res.send(result);
    // });
    // get all the appointments matched with a single field
    app.get('/appointments', async (req, res) => {
        const email = req.query.email;
        const date = new Date(req.query.date).toLocaleDateString();
        const query = { email: email, appointDate: date };
        console.log(query);
        const result = await appointmentsCollection.find(query).toArray();
        console.log(result);
        res.send(result);

    })
    app.post('/appointments', async (req, res) => {
        const data = req.body;
        console.log(data);
        const result = await appointmentsCollection.insertOne(data);
        console.log(result);
        res.send(result);
    });

    app.post('/users', async (req, res) => {
        const data = req.body;
        const result = await usersCollection.insertOne(data);
        res.send(result);
    });
    app.put('/users', async (req, res) => {
        const data = req.body;
        const filter = { email: data.email };
        const options = { upsert: true };
        const updateData = { $set: data };
        const result = await usersCollection.updateOne(filter, updateData, options);
        res.send(result)
    })
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('hello doctors');
});

app.listen(port, () => {
    console.log('listening to the port ', port)
});



