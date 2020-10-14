const http = require('http');
const url = require('url');

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

function handler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    if (parsedUrl.pathname === '/users' && method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.write(JSON.stringify(users));
        res.end();
    } else if (parsedUrl.pathname === '/user' && method === 'POST') {
        const {
            firstname,
            lastname,
            username
        } = parsedUrl.query;
        console.log(parsedUrl.query);
        if (!firstname || !lastname || !username) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.write("Invalid user inputs");
            return res.end();

        }
        const user = {
            username,
            firstname,
            lastname,
            id: users.length + 1
        };
        users.push(user);
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.write(JSON.stringify(user));
        return res.end();
    } else if (parsedUrl.pathname === '/user' && method === 'DELETE') {
        const id = Number(parsedUrl.query.id);
        if (!id || isNaN(id)) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            return res.end();
        }

        const toRemove = users.findIndex(u => u.id === id);
        if (toRemove < 0) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            return res.end();
        }
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });

        const data = users.splice(toRemove, 1);

        res.write(JSON.stringify(data));
        return res.end();
    } else if (parsedUrl.pathname === '/user' && method === 'PUT') {
        const id = Number(parsedUrl.query.id);
        if (!id || isNaN(id)) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            return res.end();
        }

        const {
            firstname,
            lastname,
            username
        } = parsedUrl.query;
        if (!firstname || !lastname || !username) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.write("Invalid user inputs");
            return res.end();

        }
        const toUpdate = users.find(u => u.id === id);
        if (!toUpdate) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            return res.end();
        }
        toUpdate.firstname = firstname;
        toUpdate.lastname = lastname;
        toUpdate.username = username;

        console.log(users);
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });

        res.write(JSON.stringify(toUpdate));

        return res.end();
    } else if (parsedUrl.pathname === '/products' && method === 'GET') {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });
        res.write(JSON.stringify(products));
        res.end();
    } 
    else if (parsedUrl.pathname === '/product' && method === 'POST') {
        const {
            name,
            desc
        } = parsedUrl.query;
        console.log(parsedUrl.query);
        if (!name || !desc) {
            res.writeHead(400, {
                'Content-type': 'text/plain'
            });
            res.write("Invalid user inputs");
            return res.end();

        }
        const newProduct = {
            name,
            desc,
            id: products.length + 1
        };
        products.push(newProduct);
        res.writeHead(201, {
            'Content-type': 'text/plain'
        });
        res.write(JSON.stringify(newProduct));
        return res.end();
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/plain'
        });
        res.end();
    };
}
const server = http.createServer(handler);
server.listen(3030);