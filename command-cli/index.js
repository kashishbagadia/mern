const mongoose = require("mongoose");


// mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb+srv://<username>:<password>@cluster0.i7od8.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

const Customer = require("./models/customer");

//add customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New customer added");
    // db.close();
  });
};

//find customer
const findCustomer = (name) => {
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
    .then(customer => {
        console.info(customer);
        console.log(`${customer.length} matches`);
        // db.close();
    })
};

//update customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer)
        .then(customer => {
            console.info('Customer Updated');
        })
}

//remove customer
const removeCustomer = (_id) => {
    Customer.remove({ _id })
    .then(customer => {
        console.info('Customer Removed');
    })
}

//list customers
const listCustomer = () => {
    Customer.find()
        .then(customers => {
            console.info(customers);
            console.info(`${customers.length} customers`);
        })
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomer
}