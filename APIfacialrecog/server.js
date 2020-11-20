const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//Middle Wares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//----//

//database connection
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'admin',
        password: 'ASDcxz1!',
        database: 'smart-brain'
    }
});

//Constants
//---//


//Main
app.get('/', (req, res) => {

    res.send(database.users);
});

//Signin
app.post('/signin', (req, res) => {
    db('login').where('email', '=', req.body.email)
        .then(user => {
            console.log(user[0].length)
            if (user.length === 0) {
                return res.status(400).json('Incorrect username or password')

            }
            bcrypt.compare(req.body.password, user[0].hash, function (err, result) {
                if (result) {
                    db('users')
                        .where('email', '=', req.body.email)
                        .then(currentUser =>
                            res.status(400)
                                .json(currentUser[0]))
                }
                else {
                    res.status(400).json('Incorrect username or password')
                }
            })
            .catch(error => {
                return res.status(400).json('Incorrect username or password')
            })
        })
        .catch(res.json('something went wrong 0x00202020'))//)

});

//Register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, null, null, (err, hash) => {
        db.transaction(trx => {
            db.insert({
                email: email,
                hash: hash
            })
                .into('login')
                .returning('email')
                .then(logonEmail => {
                    return db('users')
                        .insert({
                            name: name,
                            email: logonEmail[0],
                            joined: new Date()
                        })
                })
                .then(ok => {
                    trx.commit
                    res.status(400).json('done')
                })
                .catch(error => {
                    trx.rollback
                    res.json('error registering')
                })
        })
        if (err) {
            res.status(400).json('Something went wrong');
        }
    });

});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where({ id: id })
        .then(user => {
            user.length ?
                res.json(user[0].name)
                :
                res.json('user not found')
        })
        .catch(error =>
            res.status(400).json('Something went wrong')
        )
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(error => res.status(400).json('Something went wrong'))

})

app.listen(3001, () => {
    console.log('app is running');
});

