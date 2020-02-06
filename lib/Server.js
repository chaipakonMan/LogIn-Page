let Mongoo = require('./Mongo');
let mongky = new Mongoo();

const express = require('express');
const path = require('path');
const app = new express();
app.use(express.urlencoded());

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'../','index.html'));
});

app.get('/signUp', (req, res) =>{
    res.sendFile(path.join(__dirname,'../client/Signup.html'));
});
app.post('/signup',(req, res)=>{
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log(name);
    console.log(username);
    console.log(password);
    console.log(email);
    mongky.newUser(username, password);
    
    // refresh the page for a login page
    res.sendFile(path.join(__dirname,'../client/Congress.html'));
});

app.get('/signIn', (req, res)=>{
    res.sendFile(path.join(__dirname,'../client/Login.html'));
});
app.post('/signIn', (req, res)=>{

    console.log(req.body.username);
    console.log(req.body.password);
    // checkerUser will return True or false 
    async function waitForIt(){
        const checker = await mongky.checkUser(req.body.username, req.body.password);
        //console.log(`IDK: ${checker}`);
        if(checker === 'False'){
            console.log('Really False');
            //return false;
            //TODO render a dummie page
            res.sendFile(path.join(__dirname,'../client/WrongID.html'));
        }
        if(checker === 'True'){
            console.log('Really True');
           //return true;
           //TODO render a react page of members
           const arrUsers = await mongky.getAllUsers();
           arrUsers.forEach(function(entry) {
            console.log(entry);
           });
           res.sendFile(path.join(__dirname,'../client/Members.html'));
        }
    }
    
    waitForIt();
});


// (make the whole folder static) loading the css! 
app.use(express.static(path.join(__dirname, '../client')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


module.exports = app;
