const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.afq9fgb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const singleCollection = client.db('tekkonnectpro').collection('single');
        const storedCollection = client.db('tekkonnectpro').collection('stored');



        // app.get('/sectors', async (req, res) => {
        //     const query = {}
        //     const cursor = sectorCollection.find(query);
        //     const sectors = await cursor.toArray();
        //     res.send(sectors);
        // });

        app.post('/single', async (req, res) => {
            const store = req.body;
            const result = await singleCollection.insertOne(store);
            res.send(result);
            console.log('Data added successfully...');
        });

        app.get('/single', async (req, res) => {
            const query = {};
            const cursor = singleCollection.find(query);
            const stored = await cursor.toArray();
            res.send(stored);
        });

        // app.get('/storing/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const store = await storedCollection.findOne(query);
        //     res.send(store);
        // });

        // app.patch('/storing/:id', async (req, res) => {
        //     const { id } = req.params;

        //     try {
        //         const result = await storedCollection.updateOne({ _id: ObjectId(id) }, { $set: req.body });

        //         if (result.matchedCount) {
        //             res.send({
        //                 success: true,
        //                 message: `successfully updated ${req.body.name}`,
        //             });
        //         } else {
        //             res.send({
        //                 success: false,
        //                 error: "Couldn't update  ",
        //             });
        //         }
        //     } catch (error) {
        //         res.send({
        //             success: false,
        //             error: error.message,
        //         });
        //     }
        // });
        // app.put('/storing/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const user = req.body;
        //     const option = { upsert: true };
        //     const updatedUser = {
        //         $set: {
        //             name: user.name,
        //             sectors: user.sectors
        //         }
        //     };
        //     const result = await storedCollection.updateOne(filter, updatedUser, option);
        //     res.send(result);
        // });

    } finally {

    }
}



run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('tekkonnectpro server is running')
})

app.listen(port, () => {
    console.log(`tekkonnectpro  server running on ${port}`);
})