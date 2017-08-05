import inquirer from "inquirer";
import databaseCommand from "./database";

const conversationStarter = [
  {
    type: 'list',
    name: 'starter',
    message: 'What do you want to do?',
    choices: [
      {
        name: 'Database Utils',
        value: 'database'
      }
    ]
  },
];

inquirer.prompt(conversationStarter).then((answer)=>{
  if (answer['starter'] === 'database') {
    databaseCommand();
  }
});