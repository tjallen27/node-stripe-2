// stripePublishableKey: 'pk_test_CGQfgCOAuB880dmwwD4LWaiS',
// stripeSecretKey: 'sk_test_gsF7ubnlEZsQvxDjBiYPv8xy'
const express = require('express');
const { stripeSecretKey, stripePublishableKey } = require('./config/environment');
const stripe = require('stripe')(stripeSecretKey);
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Folder
app.use(express.static(`${__dirname}/public`));

// Index Route
app.get('/', (req, res) => {
  res.render('index', {
    stripePublishableKey: stripePublishableKey
  });
});

// Charge Route
app.post('/charge', (req, res) => {
  const stripeToken = req.body.stripeToken;
  const email = req.body.stripeEmail;
  const amount = 999;

  // create the customer
  stripe.customers.create({
    email: email,
    source: stripeToken
  })
  // charge the customer
  .then(customer => stripe.charges.create({
    amount,
    description: 'Web Development Ebook',
    currency: 'gbp',
    customer: customer.id
  }))
  // render complete page if charge is successful
  .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
