// For development purpose only !
const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
    let html = fs.readFileSync('./src/index.html', 'utf-8')
    res.send(html);
})

app.get('/style', async(req, res) => {
    res.sendFile(__dirname + '/src/style/style.css')
})

app.get('/js', async(req, res) => {
    res.sendFile(__dirname + '/src/index.js')
})

app.listen(PORT, () => { console.log("Running at http://localhost:" + PORT) })