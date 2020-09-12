const functions = require('firebase-functions');

exports.randomNumber = functions.https.onRequest((req, res) => {
    const number = Math.round(Math.random() * 100);
    res.send(number);
});