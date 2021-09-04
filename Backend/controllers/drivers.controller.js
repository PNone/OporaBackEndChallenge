const driversRepo = require('../db/drivers.repository');

const getByIdOrName = function(req, res){
    res.send(driversRepo.getByIdOrName(req.params.id));
}

const getByYear = function(req, res){
    res.send(driversRepo.getByYear(req.params.year));
}

module.exports = {
    getByIdOrName,
    getByYear
};