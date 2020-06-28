const BattleModel = require('../models/cities')
const util = require('util');
const colors = require('colors');


module.exports = async (req, res) => {
    try {
        if (!req.params.entity) throw new Error('No entity specified');
        // req.params.entity = req.params.entity.toUpperCase();
        util.log(colors.green(`Battle API : List :  Retrieve list for ${req.params.entity}`));
        const entity = await BattleModel.find({}, {
            [req.params.entity]: 1
        });
        res.status(200).send([...new Set(entity.map(ent => ent[req.params.entity]).filter(a => a.length > 0))]);
    } catch (error) {
        util.log(colors.red(`Battle API : Lsit :  Error while finding Battle ${req.params.id}: ${error.stack ? error.stack : error}`));
        res.status(400).send({
            message: `Error while finding Battle ${req.params.id}: ${error}`,
        });
    }
};