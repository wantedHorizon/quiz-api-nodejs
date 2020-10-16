# Quiz-API-nodeJS

-- An api to store users and ranks for quiz app
see live at: https://my-routes-eliran.herokuapp.com/




### **ROUTES**

- **[GET]  "/"**

  > Welcome text  

- **[GET] "/quiz/questions/:username"**

  > get all survey questions by username.

- **[GET] "/quiz/question/:username?q=index"**
  > get one survey questions by username and question index.

- **[GET] "/quiz/:username/rank/:player_name"**

  > get rank by username and player_name


- **[GET]  "/users"**
  > get all users data

- **[GET]  "/ranks"**
  > get all ranks data



- **[POST]  "/quiz/create/user"**
  

  ```    
   create a new user  with json data such as 
    {
        "username":"eliran95",
        "firstname":"Eliran",
        "lastname":"Amzalag",
        "survey":[
        {
                "q":"q1",
                "answers": [
                    "ans1",
                    "ans2",
                    "ans3",
                    "ans4"
                ],
                "correct": 1
            },... 
        ]
    }

    

- **[POST]  "/quiz/answers/add"**  
  ```    
   add new answers and create new Rank.
   you must supply json data such as 
  {
    "username":"eliran95",
    "player_name":"test",
    "answers":[    
        1,1,1,1,1,4,1,1,1,1      
    ]

  }

<!-- ## Card Object Description -->

## Available Scripts

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.