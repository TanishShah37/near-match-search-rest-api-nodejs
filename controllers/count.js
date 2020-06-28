const BattleModel = require('../models/cities')
const util = require('util');
const colors = require('colors');

module.exports = async (req, res) => {
    try {
        util.log(colors.green('Battle API : Count :  Total Number of Battles'));
        const Battles = await BattleModel.find({});
        res.status(200).send({
            data: Battles.length
        });
    } catch (error) {
        util.log(colors.red(`Battle API : Count : Error while finding Total Number of Battles : ${error.stack ? error.stack : error}`));
        res.status(400).send({
            message: `Error while finding Total Number of Battles : ${error}`
        });
    }
}