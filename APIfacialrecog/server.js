const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const testDb = {
    users: [
        {
            id: "1",
            name: "First User",
            email: "firstuser@test.com",
            password: 'secret',
            entries: 0,
            joined: new Date()
        },
        {
            id: "2",
            name: "Second User",
            email: "seconduser@test.com",
            password: 'secret',
            entries: 0,
            joined: new Date()
        },
        {
            id: "3",
            name: "Third User",
            email: "thirduser@test.com",
            password: 'secret',
            entries: 0,
            joined: new Date()
        },
    ],
    logins: [
        {
            id: "123",
            hash: '',
            email: 'firstuser@test.com'
        },
    ]

};


app.get('/', (req, res) => {

    res.send(testDb.users);
});

app.post('/signin', (req, res) => {
    console.log(req.body)
    res.json('sent');
});

app.post('/register', (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    testDb.users.push({
        id: "4",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });

    res.status(200).json(`Registration success for ${req.body.email}`)
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let isUserFound = false;

    testDb.users.forEach(user => {
        if (id === user.id) {
            isUserFound = true;
            return res.json(user);
        }
    });

    if (!isUserFound) {
        res.status(404).json('No such user found')
    }

});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let isUserFound = false;

    testDb.users.forEach(user => {
        if (id === user.id) {
            isUserFound = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!isUserFound) {
        res.status(404).json('No such user found')
    }

    res.send('GET request to the homepage')
})

app.listen(3000, () => {
    console.log('app is running');
});

