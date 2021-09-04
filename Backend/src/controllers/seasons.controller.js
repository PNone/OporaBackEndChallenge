import { getTopThree as getTopThreeForEachYear } from '../db/seasons.repository.js';

const getTopThree = function(req, res){
    res.send(getTopThreeForEachYear());
}

export default {
    getTopThree
};