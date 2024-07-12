// const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Item = require('./models/item');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());

// Connect to MongoDB
const connectDB = require("./connectDB");
connectDB();

app.use(cors({
    origin: 'https://crud-db.vercel.app', // Adjust this based on your setup
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));




const dbName = 'crudDB';
// Collection Name
const collectionName = 'items';
// Routes

// Create a new item
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/', (req, res) => {
    console.log('working')
    res.send('Hello World!');
});

// Read all items
// app.get('/items', async (req, res) => {
//     try {
//         const items = Item.find();
//         res.json(items);
//         console.log('server working')
//     } catch (err) {
//         console.error('server error')
//         res.status(500).json({ message: err.message });
//     }
// });
// Read Search item
app.get('/items', async (req, res) => {
    try {
        var name = req.query.name;
        var clientId = req.query.clientId;
        let query = {};
        if (name && clientId) {
            query = {
                $or: [
                    { "name": { $regex: new RegExp('.*' + name + '.*', 'i') } },
                    { "clientId": { $regex: new RegExp('.*' + clientId + '.*', 'i') } }
                ]
            };
        } else if (name) {
            // query = { "name": { $regex: '.' + name + '.', $options: 'i' } };
            query = { "name": { $regex: new RegExp('.*' + name + '.*', 'i') } };
        } else if (clientId) {
            query = { "clientId": { $regex: new RegExp('.*' + clientId + '.*', 'i') } };
        }

        console.log('query', query);

        const Data = await Item.find(query);
        console.log('items', Data);
        res.json(Data);
        console.log('server working')
    } catch (err) {
        console.error('server error')
        res.status(500).json({ message: err.message });
    }
});

// Read one item
app.get('/items/:id', getItem, (req, res) => {
    res.json(res.item);
});

// Update one item
app.patch('/items/:id', getItem, async (req, res) => {
    if (req.body.name != null) {
        res.item.name = req.body.name;
    }
    if (req.body.description != null) {
        res.item.description = req.body.description;
    }
    if (req.body.price != null) {
        res.item.price = req.body.price;
    }
    try {
        const updatedItem = await res.item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one item
app.delete('/items/:id', getItem, async (req, res) => {
    try {
        await res.item.remove();
        res.json({ message: 'Deleted item' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getItem(req, res, next) {
    try {
        const item = await Item.findById(req.params.id);
        if (item == null) {
            return res.status(404).json({ message: 'Cannot find item' });
        }
        res.item = item;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

app.listen(PORT, () => {
    console.log(`Server started on port on http://localhost:${PORT}`);
});


// username : clevermerkle2@tomorjerry.com