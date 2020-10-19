const fs = require('fs');

const RANKS_PATH= "./utils/db/ranks.json";

const getData = () => {
    try {
        const dataBuffer = fs.readFileSync(RANKS_PATH)
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return {}
    }

}

const saveData = (data) => {
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync(RANKS_PATH, dataJSON)
}

const getRanksByUsername = (username) => {
    const ranks = getData();
    if(!ranks[username]){
        ranks[username] = [];
        saveData(ranks);
    }
    return ranks[username];
}

const getRankByUsernameAndName = (username,name) => {
    const ranks = getData();
    if(ranks[username]){

        return ranks[username].find(o => o.player_name === name);
    }
    return null;
}

const addNewRank = (rankData,username) => {
    const ranks = getData();
    if(!ranks[username]){
        ranks[username] = [];
    }
    ranks[username].push(rankData)
    saveData(ranks);
    return rankData;
}

module.exports = {
    saveData,
    getRanksByUsername,
    getData,
    addNewRank,
    getRankByUsernameAndName
}