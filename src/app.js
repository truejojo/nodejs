const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Customer = require('./models/customer');
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();
mongoose.set('strictQuery', false);

// mongodb+srv://joeveh:<db_password>@cluster0.we6dm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

const customers = [
  {
    name: 'Jojo',
    industry: 'Programming',
  },
  {
    name: 'Vi',
    industry: 'School',
  },
  {
    name: 'Zo',
    industry: 'Kita',
  },
];

// const customer = new Customer({
//   name: 'Jasmin',
//   industry: 'Extrem Sport: Parkour',
// });

app.get('/', async (req, res) => {
  res.send('welcome');
});

// get all customers
app.get('/api/customers', async (req, res) => {
  // console.log(await mongoose.connection.db.listCollections().toArray());

  try {
    const result = await Customer.find();
    res.json({ customers: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get customer by id
app.get('/api/customers/:id', async (req, res) => {
  // res.json({
  //   requestParams: req.params, // einfach angehängt => /50
  //   // /50/Hambur => /:id/:state
  //   requestQuery: req.query, // ?age=50&state=Hamburg
  // });
  // console.log({
  //   requestParams: req.params, // einfach angehängt => /50
  //   // /50/Hambur => /:id/:state
  //   requestQuery: req.query, // ?age=50&state=Hamburg
  // });
  try {
    const customerId = req.params.id;
    console.log(customerId);
    const customer = await Customer.findById(customerId);
    console.log(customer);
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
    console.log(customer);
    res.json({ customer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// update customer by small part
app.patch('/api/customers/:id', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findOneAndReplace(
      { _id: customerId },
      req.body,
      { new: true },
    );
    console.log(customer);
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
  console.log(req.body);
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
