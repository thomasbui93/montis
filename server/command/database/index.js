import co from "co";
import inquirer from "inquirer";
import cleanUpDatabase from "./cleanup"
import bootstrapDatabase from "./bootstrap";

const conversation = [
  {
    type: 'list',
    name: 'commandOption',
    message: `Please input what you wish to do with the database`,
    choices: [
      {
        name: 'Clean up',
        value: 'cleanup'
      },
      {
        name: 'Bootstrap',
        value: 'bootstrap'
      },
      {
        name: 'Clean cache',
        value: 'cleanCache'
      }
    ]
  },
  {
    type: 'input',
    name: 'cleanUpCollection',
    message: 'Please input collections by name and separated by comma symbols. Leave empty to clean them all',
    when: function (answers) {
      return answers['commandOption'] === 'cleanup';
    }
  },
  {
    type: 'input',
    name: 'bootstrapCollection',
    message: 'Please input collections by name and separated by comma symbols. Leave empty to clean them all',
    when: function (answers) {
      return answers['commandOption'] === 'bootstrap';
    }
  }
];


const databaseCommand = () => {
  inquirer.prompt(conversation).then( commandList => {
    const {bootstrapCollection, cleanUpCollection, commandOption } = commandList;
    if( commandOption === 'cleanup' ) cleanUpDatabase(cleanUpCollection );
    if( commandOption === 'bootstrap' ) bootstrapDatabase(bootstrapCollection);
  })
};

export default databaseCommand;