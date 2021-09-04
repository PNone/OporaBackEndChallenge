const { Pool } = require('pg')
const { driversByIdQuery } = require('../commons/queries');

const getTopThree = function () {
    const pool = new Pool();
    const client = await pool.connect()
    try {
        return await client.query(getTopThreeOfEachYear, []);
    }
    finally {
        client.release();
    }
}


module.exports = {
    getTopThree
};


