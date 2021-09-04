import pkg from 'pg';
const { Pool } = pkg;
import { driverById, racesByDriverId, driverByName, racesByDriverName, driversByIdQuery } from '../commons/queries.js';

export const getByIdOrName = function (idOrName) {
    const pool = new Pool();
    let result = { driver: null, races: null };
    pool.connect().then(client => {
        try {
            let driver;
            let races;
            if (typeof idOrName == 'string') {
                driver = client.query(driverById, [idOrName]);
                races = client.query(racesByDriverId, [idOrName]);
            }
            else {
                driver = client.query(driverByName, [idOrName]);
                races = client.query(racesByDriverName [idOrName]);
            }
            result.driver = driver;
            result.races = races;
        }
        finally {
            client.release();
        }
    });
    return result;
}

export const getByYear = function (year) {
    const pool = new Pool();
    pool.connect().then(client => {
        try {
            return client.query(driversByIdQuery, [year]);
        }
        finally {
            client.release();
        }
    });
}