const fs = require('fs');

const USERS_PATH= "./utils/db/users.json";

const getData = () => {
    try {
        const dataBuffer = fs.readFileSync(USERS_PATH)
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

const saveData = (data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(USERS_PATH, dataJSON)
}

const getUserData = (username) => {
    const users = getData();
    return users.find(u=> u.username === username);
}

const addNewUser = (userData) => {
    const users = getData();
    users.push(userData);
    saveData(users);
    return userData;
}

module.exports = {
    saveData,
    getUserData,
    getData,
    addNewUser
}