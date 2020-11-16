const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


//Middle Wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//----//

//Constants
const database = {
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
//---//


//Main
app.get('/', (req, res) => {

    res.send(database.users);
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    bcrypt.compare(req, hash, function (err, res) {
        // res == true
    });
    console.log(req.body)
    res.json('sent');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, null, null, (err, hash) => {
        database.users.push({
            id: "4",
            name: name,
            email: email,
            password: hash,
            entries: 0,
            joined: new Date()
        });
        if(err){
            console.log(err)
        }
    });
    console.log(req.body)
    console.log(database.users[database.users.length -1])
    res.json(database.users[database.users.length -1])
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let isUserFound = false;

    database.users.forEach(user => {
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

    database.users.forEach(user => {
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

app.listen(3001, () => {
    console.log('app is running');
});

