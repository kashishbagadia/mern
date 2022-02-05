#! /usr/bin/env node
const program = require("commander");
const { prompt } = require("inquirer");
const {
  addCustomer,
  findCustomer,
  removeCustomer,
  updateCustomer,
  listCustomer,
} = require("./index");

const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Customer First Name",
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
  },
];

program.version("1.0.0");

//add command
program
  .command('add')
  .alias("a")
  .description("Add a customer")
  .action(() => {
    prompt(questions).then((answers) => addCustomer(answers));
  });

//find command
program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

//update command
program
  .command("update <_id>")
  .alias("u")
  .description("Update a customer")
  .action((_id) => {
    prompt(questions).then(answers => updateCustomer(_id, answers));
  });

//remove command
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a customer")
  .action(_id => removeCustomer(_id));

//list command
program
  .command("list")
  .alias("l")
  .description("List all customers")
  .action(() => listCustomer());

program.parse(process.argv);