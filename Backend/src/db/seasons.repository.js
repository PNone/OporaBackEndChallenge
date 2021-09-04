import pkg from 'pg';
const { Pool } = pkg;
import { getTopThreeOfEachYear } from '../commons/queries.js';

export const getTopThree = function () {
    const pool = new Pool();
    pool.connect().then(client => {
        try {
            return client.query(getTopThreeOfEachYear, []);
        }
        finally {
            client.release();
        }
    });
}

