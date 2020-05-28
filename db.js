const fs = require('fs');

var database = [];
const DB_FILE = "db.json";
var isLocked = false;

/*
    format: Array of chatId
*/

function writeFile() {
    if (fs.existsSync(DB_FILE)) {
        fs.unlinkSync(DB_FILE)
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(database, null, '\t'))
}

exports.init = () => {
    try {
        isLocked = true
        const values = JSON.parse(fs.readFileSync(DB_FILE));
        if (!values.length) throw new Error('create new file!');
        console.log("Database file found! Loading data...");
        database = values;
        console.log("Data loaded successfully!");
        isLocked = false
    } catch (error) {
        isLocked = true
        console.log("No databae file found! Creating one...")
        fs.writeFileSync(DB_FILE, JSON.stringify(database));
        console.log("Database file created!")
        isLocked = false
    }
};

exports.push = async (data) => {
    while (isLocked) { } //file is under process plox wait
    try {
        isLocked = true
        database.push(data);
        writeFile();
        console.log("NEW USER:", data);
        isLocked = false;
        return true;
    } catch (error) {
        console.log('Something went wrong', error)
        return false;
    }
};

exports.get = async (chatId) => {
    try {
        const data = await database.find(val => {
            if (val == chatId) {
                return val;
            }
        })
        return data;
    } catch (error) {
        console.log('Something went wrong', error);
        return false;
    }
};

async function arrayRemove(arr, value) { 
    return arr.filter(function (ele) { return ele.userId != value; }); 
}

exports.remove = async (chatId) => {
    while (isLocked) { }
    try {
        isLocked = true
        const index = database.indexOf(chatId);
        if (index > -1) {
            database.splice(index, 1)
        }
        console.log(database)
        writeFile()
        isLocked = false
        return true
    } catch (error) {
        console.log('Something went wrong', error);
        return false;
    }
};