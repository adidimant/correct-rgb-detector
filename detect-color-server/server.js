require('dotenv').config();
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { MONITORING_LOGS, STATUS_MESSAGES } = require('./consts');
const { loadColorsData, getClosestColor, formatTambourColor, writeDataToFile } = require('./src/lib/utils');
const { estimateRgb } = require('./src/lib/rgbHandler');
const lambda = require('./src/lib/lambda');
const fs = require('fs');


const multer = require('multer');
const upload = multer();

const port = process.env.PORT || 8080;
const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

let colorsData;

(async () => colorsData = await loadColorsData())();

const lambdaExecute = (fixedImagesData, fileName) => { // Local lambda code execution - for tests before deploying
    return new Promise((resolve, reject) => {
        var exec = require('child_process').exec;
        exec(`/Users/adimant/Documents/Studies/Hackathon/fixImagesClient/venv/bin/python ../fixImagesClient/final.py ${__dirname}/${fileName}`, function callback(error, stdout, stderr) {
            fixedImagesData = stdout;
            resolve();
        });
    });
};

app.get('/echo', (req, res) => {
    res.json(STATUS_MESSAGES.OK);
});

app.post('/getClosestColors', upload.any(), async (req, res) => {
    if (_.isEmpty(req.files)) {
        res.status(500).send('Invalid file');
    } else {
        try {
            const file = req.files[0];
            let fileName = 'localFileName', fixedImagesData;
            await writeDataToFile(file.buffer, fileName);
            //const fixedImages = await lambda.invoke({ file }, 'getFixedImages'); // revert after the lambda function is deployed & remove lambdaExecute call

            await lambdaExecute(fixedImagesData, fileName);

            const estimatedColors = await Promise.all(_.map(JSON.parse(fixedImagesData), async (fixedImage) => {
                const { path, probability } = fixedImage;
                const image = fs.readFileSync(path, { flag: 'r' });
                const rgbColor = await estimateRgb(image);
                const closestTambourColor = getClosestColor(colorsData, rgbColor);
                return {
                    tambourColor: closestTambourColor[2],
                    rgb: formatTambourColor(closestTambourColor),
                    probability
                };
            }));

            res.json(estimatedColors);
        }
        catch (err) {
            res.status(500).send(err);
        }
    }
});

app.listen(port, () => console.log(MONITORING_LOGS.generateServerListenMessage(port)));