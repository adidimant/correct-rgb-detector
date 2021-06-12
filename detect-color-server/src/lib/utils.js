const _ = require('lodash');
const xlsx = require('node-xlsx');
const fs = require('fs');
const stream = require('stream');

const base64 = (buffer) => (
    buffer.toString('base64')
);

const formatTambourColor = (colorDataArr) => {
    const rgbArr = _.split(colorDataArr[3], ';');
    return {
        red: rgbArr[0],
        green: rgbArr[1],
        blue: rgbArr[2],
    };
};

const calculateDifference = (colorA, colorB) => {
    const { red: r1, green: g1, blue: b1 } = colorA;
    const { red: r2, green: g2, blue: b2 } = colorB;
    return Math.sqrt(Math.pow((r2 - r1), 2) + Math.pow((g2 - g1), 2) + Math.pow((b2 - b1), 2));
};

const getClosestColor = (colorsData, color) => (
    (_.minBy(_.map(colorsData, (tambourColorArr, index) => ({
        diff: calculateDifference(formatTambourColor(tambourColorArr), color),
        tambourColorArr
    })), 'diff')).tambourColorArr
);

const loadColorsData = async () => {
    const fileData = ((await xlsx.parse(`${__dirname}/../data/RGB_colors.xlsx`))[0].data);
    fileData.shift();
    return fileData;
};

const writeDataToFile = (fileData, filePath) => {
    const dest = fs.createWriteStream(filePath);
    let readStream = new stream.PassThrough();
    return new Promise((resolve, reject) => {
        readStream.end(fileData);
        readStream.pipe(dest);
        dest.on('finish', () => {  // the event 'finish' occurres when all the bytes streamed to the file
            console.log('wrote data to file!');
            resolve();
        });
    });
};


module.exports = { loadColorsData, base64, getClosestColor, formatTambourColor, writeDataToFile };
