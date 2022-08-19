const express = require('express');
const app = express();
const fs = require("fs");
const multipart = require('connect-multiparty');
const multiPartMiddleWare = multipart();

// Build an API to download the file from disk
app.get('/download', function(req, res){
    let fileName = req.query.file_name;
    const filePath = `${__dirname}/${fileName}`;

    if (fs.existsSync(filePath)) {
        res.download(filePath);
        return;
    }

    res.status(404).send("Requested file not found");
});

// Build an API to upload file to your disk
app.post('/upload', multiPartMiddleWare, (req, res) => {
    //using multiple fs operation
    fs.readFile(req.files.input_file.path, (errRead, data) => {
        if (errRead) {
            console.log("file read error", errRead)
            res.status(400).send('File upload failed')
        }

        fs.writeFile(req.files.input_file.originalFilename, data, errWrite => {
            if (errWrite) {
                console.log("file write error", errWrite)
                res.status(400).send('File upload failed')
            }

            res.status(200).send('File upload sucess')
        })
    });

    //using single fs operation
    fs.copyFile(req.files.input_file.path, req.files.input_file.originalFilename, (err) => {
        if (errCopy) {
            console.log("file copy error", errCopy)
            res.status(400).send('File upload failed')
        }

        res.status(200).send('File upload sucess')
    });
});

//started the server listing to port 9090
app.listen(9090, () => {
    console.log("API for files upload and download started")
})

