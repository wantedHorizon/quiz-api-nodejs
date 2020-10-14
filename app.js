const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const port = process.env.PORT || 3030;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const users = [{
    username: 'eliran',
    firstname: 'eliran',
    lastname: 'amzalag',
    id: 1
}];
const products = [{
    name: 'name',
    desc: 'desc',
    id: 1
}];

app.get('/users', (req, res) => {
    res.status(200).json(users);
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.post('/user', (req, res) => {
    const {
        username,
        firstname,
        lastname
    } = req.body;
    const already = users.find(u => u.username === username);
    if (already) {
        return res.status(400).json({
            msg: 'username is taken'
        });
    }
    if (!username || !firstname || !lastname) {
        return res.status(400).send('invalid request, please provide all user fields');
    }

    const newUser = {
        username,
        lastname,
        firstname,
        id: users.length + 1
    };
    users.push(newUser);
    res.status(200).json(newUser);

})

app.delete('/user', (req, res) => {
    if (!req.query || !req.query.id) {
        return res.status(400).send("Bad Request , plz provide an id");
    }
    const id = Number(req.query.id);

    const toRemove = users.findIndex(u => u.id === id);
    if (toRemove < 0) {
        return res.status(404).send("user not found");
    }

    const data = users.splice(toRemove, 1);
    res.status(201).send({
        msg: 'user was removed successfully',
        data
    });

});

app.put('/user', (req, res) => {
    if (!req.query || !req.query.id) {
        return res.status(400).send("Bad Request , plz provide an id");
    }

    const id = Number(req.query.id);

    let prev = users.find(u => u.id === id);
    if (!prev) {
        return res.status(404).send("user not found");
    }
    console.log(req.body);

    const {
        username = prev.username,
            firstname = prev.firstname,
            lastname = prev.lastname
    } = req.body;

    prev.username = username;
    prev.firstname = firstname;
    prev.lastname = lastname;


    res.status(200).send(prev);
})


app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/product', (req, res) => {
    const {
        name,
        desc
    } = req.body;
    if (!name || !desc) {
        return res.status(400).send('error invalid input');
    }
    const newProduct = {
        name,
        desc,
        id: products.length + 1
    }
    products.push(newProduct);
    console.log(products);
    res.send(newProduct);
})



app.get('*', (req, res) => {
    res.status(404).send("Page not found");
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})