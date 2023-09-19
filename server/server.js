const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.static('modified_files'))
// app.use(cors()); this will allow cors on the whole app

const PORT = 8080;

app.post('/upload', cors(), function(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, file) {
        if (Object.keys(file).length == 0) {
            res.status(404).end();
            console.log("Error empty input file!");
            return;
        }
        
        const filePath = file.fileupload[0].filepath;
        const rawData = fs.readFileSync(filePath);
        const loadedPath = './uploaded_files/' + file.fileupload[0].originalFilename;
        let modifiedPath = './modified_files/' + file.fileupload[0].originalFilename;

        fs.writeFile(loadedPath, rawData, function(err) {
            if (err) console.log(err)
        });

        // Do something
        modifiedPath = "sample.png";
        res.send(modifiedPath);
    });
});

app.listen(PORT, function(err) {
    if(err) console.log(err)
    console.log(`Server is running at port ${PORT}...`);
 });