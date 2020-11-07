const express = require('express');
const app = express();
app.use(express.urlencoded({extended: false}));
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
    ]
};


app.get('/', (req,res) =>{
    
    res.send(testDb.users);
});

app.post('/signin', (req, res) =>{
    console.log(req.body)
    res.json('sent');
});

app.post('/register', (req, res) =>{
    console.log(req.body);
    const {name,email,password} = req.body;
    testDb.users.push({
        id: "4",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()    
        });
     
        res.json('200',`Registration success for ${req.body.email}` )
});


app.listen(3000, () =>{
    console.log('app is running');
});

