const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const success = (message) => console.log(chalk.green(message));
const error = (message) => console.log(chalk.red(message));
//helper function to display sucess message 

//menu for the CLI
const menu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'what would you like to do?',
            choices: [
                'Create File',
                'Read File',
                'Delete File',
                'Create Directory',
                'Delete Directory',
                'Exit',
            ],

        },
    ]);
    return action;
};
const handleAction = async () => {
    const action = await menu();

    switch (action) {
        case 'Create File':
            await createFile();
            break;
        case 'Read File':
            await readFile();
            break;
        case 'Delete File':
            await deleteFile();
            break;
        case 'Create Directory':
            await createDirectory();
            break;
        case 'Delete Directory':
            await deleteDirectory();
            break;
        case 'Exit':
            console.log(chalk.blue('Goodbye!'));
            process.exit();
    }
    //handle action

    // Loop back to the menu after each action
    await handleAction();
};

//create a new file
const createFile = async () => {
    const { fileName, content } = await inquirer.prompt([
        { type: 'input', name: 'fileName', message: ' Enter file name:' },
        { type: 'input', name: 'content', message: 'Enter file content:' },
    ]);

    try {
        fs.writeFileSync(path.join(_dirname, fileName), content, 'utf-8');
        success(`File "${fileName}" created successfully.`);
    } catch (err) {
        error(`Error creating file: ${err.message}`);
    }


};
//read file
const readFile = async () => {
    const { fileName } = await inquirer.prompt([
        { type: 'input', name: 'fileName', message: 'Enter file name to read:' },
    ]);

    try {
        const content = fs.readFileSync(path.join(__dirname, fileName), 'utf-8');
        success(`Content of "${fileName}":\n\n${content}`);
    } catch (err) {
        error(`Error reading file: ${err.message}`);
    }
};
// Delete a file
const deleteFile = async () => {
    const { fileName } = await inquirer.prompt([
        { type: 'input', name: 'fileName', message: 'Enter file name to delete:' },
    ]);

    try {
        fs.unlinkSync(path.join(__dirname, fileName));
        success(`File "${fileName}" deleted successfully.`);
    } catch (err) {
        error(`Error deleting file: ${err.message}`);
    }
};

// Create a directory
const createDirectory = async () => {
    const { dirName } = await inquirer.prompt([
        { type: 'input', name: 'dirName', message: 'Enter directory name to create:' },
    ]);

    try {
        fs.mkdirSync(path.join(__dirname, dirName));
        success(`Directory "${dirName}" created successfully.`);
    } catch (err) {
        error(`Error creating directory: ${err.message}`);
    }
};

// Delete a directory
const deleteDirectory = async () => {
    const { dirName } = await inquirer.prompt([
        { type: 'input', name: 'dirName', message: 'Enter directory name to delete:' },
    ]);

    try {
        fs.rmdirSync(path.join(__dirname, dirName), { recursive: true });
        success(`Directory "${dirName}" deleted successfully.`);
    } catch (err) {
        error(`Error deleting directory: ${err.message}`);
    }
};
// Start the application
console.log(chalk.blue('Welcome to the File System CLI App!'));
handleAction();
