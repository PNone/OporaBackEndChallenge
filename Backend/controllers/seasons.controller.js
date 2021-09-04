const seasonsRepo = require('../db/seasons.repository');

const getTopThree = function(req, res){
    res.send(seasonsRepo.getTopThree());
}

module.exports = {
    getTopThree
};