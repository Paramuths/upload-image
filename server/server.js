const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.static('./server/modified_files'))
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
        const originalFilename = file.fileupload[0].originalFilename;
        const rawData = fs.readFileSync(filePath);
        const loadedPath = './server/uploaded_files/' + originalFilename;
        const modifiedPath = './server/modified_files/' + originalFilename;

        fs.writeFileSync(loadedPath, rawData, function(err) {
            if (err) console.log(`Error writing file: ${err}`)
        });

        // Do something
        fs.renameSync(loadedPath, modifiedPath, function(err) {
            if (err) console.log(`Error renaming file: ${err}`)
        })
        //
        const modifiedStaticPath = originalFilename;
        res.send(modifiedStaticPath);
    });
});

app.listen(PORT, function(err) {
    if(err) console.log(`Error connecting to port ${PORT}: ${err}`)
    console.log(`Server is running at port ${PORT}...`);
 });