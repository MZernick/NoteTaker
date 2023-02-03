const express = require('express');
const path = require('path');
const fs = require('fs');
//const { clog } = require('./middleware/clog');
//const api = require('./public/assets/js/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    var options = { encoding: 'utf8', flag: 'r' };
    res.json(JSON.parse(fs.readFileSync('./db/db.json', options)));
});

//POST route to save notes
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
        };
        const noteString = JSON.stringify(newNote);
        fs.readFile(noteString, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(content);
                fs.writeFile('./db/db.json', JSON.stringify(content, null, 4), (err) =>
                    err ? console.error(err) : console.info(`Data written to db.json`)
                );
            }
        });
    }
});

// Wildcard route to direct users back to home page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);