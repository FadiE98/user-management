const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'userSystem'
})

app.post('/create', (req, res) => {
    const name = req.body.name
    const age = req.body.age
    const email = req.body.email
    const position = req.body.position

    db.query("INSERT INTO users (name, age, email, position) VALUES (?,?,?,?)", 
    [name, age, email, position], 
    (err, res) => {
        if(err){
            console.log(err);
        }else{
            console.log("values inserted");
        }
    }
    );

});

app.get('/users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen(3000, () => {
    console.log("running on server port 3000");
});