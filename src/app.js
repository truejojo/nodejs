const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Customer = require('./models/customer');
const app = express();
mongoose.set('strictQuery', false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.get('/', async (req, res) => {
  res.send('welcome');
});

// get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get customer by id
app.get('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      res.status(404).json({ error: 'User not found!' });
    } else {
      res.json({ customer });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update customer by all properties
app.put('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndReplace(
      { _id: customerId },
      req.body,
      { new: true },
    );
    res.json({ customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update customer by property/properties
app.patch('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findByIdAndUpdate(
      { _id: customerId },
      req.body,
      { new: true },
    );
    res.json({ customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete customer
app.delete('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const result = await Customer.deleteOne({ _id: customerId });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add new customer
app.post('/api/customers', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({ customer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/', (req, res) => {
  res.send('This is a post request');
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const result = await Customer.findOne({ 'orders._id': req.params.id });
    if (result) {
      res.json(result);
    } else {
      res.status(404).json('err', 'not found');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);
  } catch (err) {
    console.log(err.message);
    throw new Error(err);
  }

  app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
  });
};

start();
