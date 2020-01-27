const mongoose = require('mongoose');
const UserModel = require('../models/User');
//console.log('in the class');

class Mongo {
    constructor() {
       // console.log('in constructor');
        mongoose.connect('mongodb+srv://noob0:yolo@learningdb-9nve4.mongodb.net/test?retryWrites=true&w=majority',
         { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
            console.log('Elizabeth connection successful')
        })
        .catch(err => {
            console.log('Connection Error: ' + err)
        })
    }

    // define functions here
    /**
     * Creates a new user in the database
     * @param {String} userName to store
     * @param {String} password password to hash and store
     */
    newUser(userName, password) {
        return new Promise((resolve, reject) => {
                //store hash in db
                var newUser = new UserModel({
                    userName: userName,
                    password: password
                })

                newUser.save()
                .then(doc => {
                    console.log('New user ' + userName +  ' saved to doc: ' + doc);
                })
                .catch(err => {
                    console.error(err);
                })
        })
    }    

    /**
     * Retrieves all users from the DB 
     */
    getAllUsers() {
        return new Promise((resolve, reject) => {
            UserModel.find(function (err, users) {
                if (err) return console.error(err);
                // console.log(users);
                
                let arrUsers = [];
                for(let i=0;i<users.length;i++){
                    arrUsers.push(users[i].userName)
                }
                /*
                arrUsers.forEach(function(entry) {
                    console.log(entry);
                });*/
                resolve(arrUsers);
              })
        })
    }

     /**
     * Retrieves a user by userName from the DB 
     * @param {String} userName a name to be looking for.
     */
    getUser(userName) {
        return new Promise((resolve, reject) => {
            UserModel.find({userName: userName}, (err, doc) => {
                if(err) return console.log('DANG IT!');
                console.log(doc);
            });
        })
       
    }


    // TODO checkout how to return a True of flase, instead of a fricking console.log()!!!!
    // set doc = to something and check if it a empty array or not. If it is then false;
    /**
     * Retrieves a user by userName from the DB 
     * @param {String} userName a name to be check for.
     * @param {String} password a password ti be check for.
     */
    checkUser(userName, password) {
        return new Promise((resolve, reject) => {
            UserModel.find({userName: userName, password: password}, (err, doc) => {
                if(err) return console.log('DANG IT!');
                if(doc.length === 0){
                    console.log("send F");
                    resolve('False');
                }else{
                    console.log("send T");
                    resolve('True');
                }
            });
        })
    }

}

module.exports = Mongo;