const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const usersDB = require('./utils/users');
const ranksDB = require('./utils/ranks');

const port = process.env.PORT || 3030;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const QUESTIONS_AMOUNT = 10;
const QUESTIONS_OPTIONS = 4;




app.get('/', (req, res) => {
    res.send('Hi im Eliran,<br> Welcome to my API build with express');
})

//create new user with newSurvey => newUser
app.post('/quiz/create/user', (req, res) => {
    const {
        username,
        firstname,
        lastname,
        survey
    } = req.body;
    const already = usersDB.getUserData(username);
    // const already = users.find(u => u.username === username);

    if (already) {
        return res.status(400).json({
            msg: 'username is taken'
        });
    }
    if (!username || !firstname || !lastname || !validateSurvey(survey)) {
        return res.status(400).send('invalid request, please provide all user fields');
    }

    const newUser = {
        username,
        lastname,
        firstname,
        survey,
        id: users.length + 1
    };
    usersDB.addNewUser(newUser);
    // users.push(newUser);
    res.status(200).json(newUser);

})

//add new quiz results =>  results
app.post('/quiz/answers/add', (req,res) =>{
    const {
        username,
        player_name,
        answers
    } =req.body;

    const userData =  usersDB.getUserData(username);

    if(!userData){
        return res.status(400).send("username doesn't exist");
    }
    else if(!validateAnswers(answers)){
        return res.status(400).send("invalid answers");
    }
    const prevRanks = ranksDB.getRankByUsernameAndName(username,player_name);

    if (prevRanks){
        return res.status(400).send(`player_name:'${player_name}' is already exist on username: "${username}"`);
    }
    
    const {survey} =userData;
    const correct = answers.reduce( (acc,answer,index) => {
        return survey[index].correct === answer ? acc+1: acc;
    },0)
    
    const rankData = {
        username,
        date:  Date.now(),
        rank:correct/survey.length,
        player_name
    }
    
     const result =ranksDB.addNewRank(rankData,username);
        

    
    res.status(201).json(result);
});



//get all questions
app.get('/quiz/questions/:username',(req,res)=> {

    const {username}=req.params;
    if(!username || username.length<3){
        return res.status(400).send("invalid request, plz supply valid username ");
    }
    
    const userData = usersDB.getUserData(username);
    if(!userData){
        return res.status(400).send(`invalid request, username:'${username}' doesn't exist `);

    }
    const questions = userData.survey.map(({q,answers}) => {return {q,answers}})
    res.status(200).json(questions);
});

//get one question
app.get('/quiz/question/:username',(req,res)=> {
    const {q} = req.query; 
    const qIndex = Number(q);
    const {username}=req.params;


    if( (!qIndex && qIndex!== 0) || qIndex<0 || qIndex> QUESTIONS_AMOUNT){
        return res.send("invalid q param");
    }

    if(!username || username.length<3){
        return res.status(400).send("invalid request, plz supply valid username ");
    }
    
    const userData = usersDB.getUserData(username);
    if(!userData){
        return res.status(400).send(`invalid request, username:'${username}' doesn't exist `);

    }
    const question = userData.survey[qIndex];
    // const output ={ q:question.q,answers:question.answers};
    return res.status(200).json({ q:question.q,answers:question.answers});
});

//get rank by username and player_name
app.get('/quiz/:username/rank/:player_name', (req,res) => {
    const {username,player_name} = req.params;

    if(!username || !player_name){
        return res.status(400).send("invalid input");
    }
    const rankResult = ranksDB.getRankByUsernameAndName(username,player_name);

    
    if(!rankResult){
        return res.status(400).send(`player_name:"${player_name}" doesn't exist on username:${username}`);
    }

    res.status(200).json(result);

});
app.get('/users', (req, res) => {
    const usersData= usersDB.getData();
    res.status(200).json(usersData);
});


// app.delete('/user', (req, res) => {
//     if (!req.query || !req.query.id) {
//         return res.status(400).send("Bad Request , plz provide an id");
//     }
//     const id = Number(req.query.id);

//     const toRemove = users.findIndex(u => u.id === id);
//     if (toRemove < 0) {
//         return res.status(404).send("user not found");
//     }

//     const data = users.splice(toRemove, 1);
//     res.status(201).send({
//         msg: 'user was removed successfully',
//         data
//     });

// });

// app.put('/user', (req, res) => {
//     if (!req.query || !req.query.id) {
//         return res.status(400).send("Bad Request , plz provide an id");
//     }

//     const id = Number(req.query.id);

//     let prev = users.find(u => u.id === id);
//     if (!prev) {
//         return res.status(404).send("user not found");
//     }
//     console.log(req.body);

//     const {
//         username = prev.username,
//             firstname = prev.firstname,
//             lastname = prev.lastname
//     } = req.body;

//     prev.username = username;
//     prev.firstname = firstname;
//     prev.lastname = lastname;


//     res.status(200).send(prev);
// })





app.get('*', (req, res) => {
    res.status(404).send("Page not found");
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})


const validateSurvey = (survey) => {
    if (survey.length !== QUESTIONS_AMOUNT)
        return false;

    survey.forEach(element => {
        if (!element.hasOwnProperty('q') ||
                !element.hasOwnProperty('answers') ||
                Object.keys(element).length !== 4 ||
                isNaN(element.correct)
            )
            return false;
    });

    return true;
};

const validateAnswers = (answers) => {
    if(answers.length !== QUESTIONS_AMOUNT){
        return false;
    }

    answers.forEach(ans => {
        
        if(isNaN(ans) || ans<0 || ans >= QUESTIONS_OPTIONS)
            return false;
    
    
    });

    return true;
}