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
    db.select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email)
        .then(user => {
            const isValidLogon = bcrypt.compareSync(req.body.password, user[0].hash)
            if (isValidLogon) {
                return db.select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then(currentUser => {
                        return res.status(200).json(currentUser[0])
                    }).catch(error => res.status(400).json('something went wrong'))
            }
            else
                return res.status(400).json('Incorrect username or password')
        })
        .catch(error => res.status(400).json('Incorrect username or password'))
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
                    return trx('users')
                        .returning('*')
                        .insert({
                            name: name,
                            email: logonEmail[0],
                            joined: new Date()
                        })
                        .then(data => res.json(data[0])
                        )
                })
                .then(data => {
                    trx.commit
                })
                .catch(error => {
                    trx.rollback
                    console.log(error)
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

