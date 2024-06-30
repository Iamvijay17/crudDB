const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/item');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://clevermerkle2:EckzTOeZjqb1POOi@curddb.r9ufyvy.mongodb.net/?retryWrites=true&w=majority&appName=curdDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Live Db connected')
    app.listen(PORT, () => {
        console.log(`Server started on port on http://localhost:${PORT}`);
    });
    
}).catch((err)=>{
    console.log('Db Error', err)

});


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
    res.send('Hello World! asds');
});

// Read all items
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
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

// clevermerkle2@tomorjerry.com