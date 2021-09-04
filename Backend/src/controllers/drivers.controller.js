import { getByIdOrName as _getByIdOrName, getByYear as _getByYear } from '../db/drivers.repository.js';

const getByIdOrName = function(req, res){
    res.send(_getByIdOrName(req.params.id));
}

const getByYear = function(req, res){
    res.send(_getByYear(req.params.year));
}

export default {
    getByIdOrName,
    getByYear
};