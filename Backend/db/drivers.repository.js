const { Pool } = require('pg')
const { driversByIdQuery } = require('../commons/queries');

const getByIdOrName = function (idOrName) {
    const pool = new Pool();
    const client = await pool.connect()
    let result = {driver: null, races: null};
    try {
        let driver;
        let races;
        if (typeof idOrName == 'string') {
            driver = await client.query(driverById, [idOrName]);
            races = await client.query(racesByDriverId, [idOrName]);
        }
        else {
            driver = await client.query(driverByName, [idOrName]);
            races = await client.query(racesByDriverName [idOrName]);
        }
        result.driver = driver;
        result.races = races;
        return result;
    }
    finally {
        client.release();
    }

}

const getByYear = async function (year) {
    const pool = new Pool();
    const client = await pool.connect()
    try {
        return await client.query(driversByIdQuery, [year]);
    }
    finally {
        client.release();
    }
}

module.exports = {
    getByIdOrName,
    getByYear
};