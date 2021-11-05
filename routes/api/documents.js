const express = require('express')
const router = express.Router()

let Document = require('../../models/userdocuments.models')
const auth = require('../../middleware/auth')

require('dotenv').config()


// @route   GET /api/documents
// @desc    Get a document from DB
// @access  Private

router.get('/', (req, res) => {
    const document_id = req.query.document_id

    //simple backend validation
    if(!document_id) {
        return res.status(400).json({msg: "document_id not specified"})
    }

    //Find a document by the provided id
    Document.findById({ _id: document_id })
        .then(document => res.json(document))
        .catch(err => res.status(400).json("Error: Document does not exist " + err))
})

// @route   GET /api/documents/download
// @desc    Download a finalized document from Google Drive
// @access  Private

router.get('/download', async (req, res) => {
    const googleDocId = req.query.googleDocId

    if(!googleDocId) {
        return res.status(400).json({msg: "googleDocId not specified"})
    }

    //Use the Google API to download a PDF from Google Drive
    const { google } = require("googleapis")
    const auth = new google.auth.GoogleAuth({
        keyFile : "credentials.json", //FIGURE WHERE TO GET THIS FROM
        scopes : ["https://www.googleapis.com/auth/drive"] 
    })

    //Create client instance for auth
    const client = await auth.getClient()

    // Instance of Google Drive API
    const gDrive = google.drive({version: "v3", auth: client})

    //Stream file as PDF from google Drive and pipe it to express res 
    gDrive.files.export({fileId: googleDocId, mimeType: 'application/pdf'}, {responseType: 'stream'})
        .then(response => {
            return new Promise((resolve, reject) => {
                console.log('Beginning download stream')
                let progress = 0
                response.data
                    .on('end', () => {
                        console.log('Done downloading file.')
                        resolve()
                    })
                    .on('error', err => {
                        console.error('Error downloading file.')
                        reject(err)
                    })
                    .on('data', d => {
                        progress += d.length;
                        if (process.stdout.isTTY) {
                            process.stdout.clearLine()
                            process.stdout.cursorTo(0)
                            process.stdout.write(`Downloaded ${progress} bytes`)
                        }
                    })
                    .pipe(res) //Pipe data to the express res object
            })
        })
        .catch(err => console.log(err))
})

module.exports = router;