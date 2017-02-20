const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

var db

MongoClient.connect('mongodb://mongodb:mongodb@ds157539.mlab.com:57539/helloworld-mongodb', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
        console.log('Changes on server.js!')
    })
})



/*
app.listen(3000, function() {
    console.log('listening on 3000')
})*/

app.get('/', (req, res) => {
    // res.send('hello world')

    db.collection('quotes').find().toArray(function(err, results) {
        if (err) return console.log(err)
        console.log(results)
        res.render('index.ejs', { quotes: results })
            // send HTML file populated with quotes here
    })

    // Note: __dirname is directory that contains the JavaScript source code
    //res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooooooooo!')
    console.log(req.body)

    //store to mongodb collection
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('saved to database')
        res.redirect('/')
    })
})