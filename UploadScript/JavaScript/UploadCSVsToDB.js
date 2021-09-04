const fs = require('fs');
const Pool = require('pg').Pool;
const fastcsv = require('fast-csv');
const path = require('path');

const csvWithoutFkDirPath = process.env.CSV_WITHOUT_FK_DIR_PATH;
const csvWithFkDirPath = process.env.CSV_WITH_FK_DIR_PATH;
const host = process.env.POSTGRES_DB_HOST;
const user = process.env.POSTGRES_USER;
const database = process.env.POSTGRES_DB;
const password = process.env.POSTGRES_PASSWORD;
const port = process.env.POSTGRES_DB_PORT;

function readFiles(csvDirPath) {
    const files = fs.readdirSync(csvDirPath);
    for (let fileName of files) {
        readCsv(fileName, csvDirPath)
    }
    // function (err, fileNames) {
    //     if (err) {
    //         throw err;
    //     }
    //     fileNames.forEach(fileName => readCsv(fileName, csvDirPath));
    // }
}


function readCsv(fileName, csvDirPath) {
    let csvData = [];
    let filePath = path.resolve(csvDirPath, fileName);
    let tableName = path.parse(fileName).name;
    let formattedRow;


    fs.createReadStream(filePath)
        .pipe(fastcsv.parse())
        .on("data", function (data) {
            formattedRow = processRow(data);
            csvData.push(formattedRow);
        })
        .on("end", () => uploadCsv(csvData, tableName));
}

function uploadCsv(csvData, tableName) {
    let tableRowNames = [];
    let finalRowNames = [];
    let tableRows;
    let columnAmount;
    let placeholderNames = [];
    let placeholders;
    let i;
    
    // remove the first row, the headers from the data array.
    // Store the headers, as they contain the row names
    tableRowNames = csvData.shift();
    for (let rowName of tableRowNames) {
        finalRowNames.push(rowName.toLowerCase());
    }
    tableRows = `(${finalRowNames.join(', ')})`;
    columnAmount = finalRowNames.length;
    placeholderNames = [];
    // Each placeholder is a dollar and a number, starting from 1
    // There should be as many placeholders as there are columns in the table
    for (i = 0; i < columnAmount; i++) {
        placeholderNames.push(`$${i + 1}`);
    }
    placeholders = `(${placeholderNames.join(', ')})`;
    // create a new connection to the database
    const pool = new Pool({
        host,
        user,
        database,
        password,
        port
    });

    const query = `INSERT INTO ${tableName} ${tableRows} VALUES ${placeholders}`;
    pool.connect((err, client, release) => {
        if (err) {
            throw err;
        }

        try {
            csvData.forEach(row => {
                client.query(query, row, (error, _) => {
                    if (error) {
                        console.log(tableName);
                    console.log(query);
                    console.log(row.join('---'));
                        throw error;
                    }
                });
            });
        } finally {
            release();
        }
    });
}

function processRow(row) {
    let formattedRow = [];
    let formattedValue;
   
    for (let value of row) {
        formattedValue = processValue(value);
        formattedRow.push(formattedValue);
    }
    return formattedRow;
}

/**
 * Convert a CSV value to a valid value for db insert command
 * If value is "\N", return null
 * If value is numeric, convert it to a number and return
 * If value is not numeric, return it as is
 * @param {*} val 
 * @returns 
 */
function processValue(val) {
    let floatValue;
    let value;
    if (val == '\\N') {
        value = null;
    }
    else {
        value = val;
        // floatValue = parseFloat(val);
        // value = !isNaN(floatValue) && !isNaN(val - 0) ? floatValue : val;
    }
    
    return value
}
readFiles(csvWithoutFkDirPath);
readFiles(csvWithFkDirPath);