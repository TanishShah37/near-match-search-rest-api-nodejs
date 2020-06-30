const citiesModel = require('../models/cities')
const util = require('util');
const colors = require('colors');

module.exports = async (req, res) => {
  try {
    util.log(colors.green(`Cities API : Search: Search Cities for ${JSON.stringify(req.query)}`));

    function compareStringsAndAssignScore(stringA, stringB) {
      for (var result = 0, i = stringA.length; i--;) {
        if (typeof stringB[i] == 'undefined' || stringA[i] == stringB[i]);
        else if (stringA[i].toLowerCase() == stringB[i].toLowerCase())
          result++;
        else
          result += 4;
      }

      //Absolute Score
      finalResult = 1 - (result + 4 * Math.abs(stringA.length - stringB.length)) / (2 * (stringA.length + stringB.length));

      //Rounding Absolute Value to 2 decimals
      return Math.round(finalResult * Math.pow(10, 2)) / Math.pow(10, 2);

    }


    let suggestions = await citiesModel
      .find(
        {
          name: {
            "$regex": req.query.q,
            $options: "i",
          },
        },
        {
          _id: 0,
          name: 1,
          country: 1,
          lat: 1,
        }
      )

    suggestions = suggestions
      .map(city => {
        city.name +=  +  city.country;
        city.score = compareStringsAndAssignScore(city.name, req.query.q);
        return city;
      }).sort((a, b) => b.score - a.score)



    res.status(200).type('json').send(JSON.stringify({
      suggestions
    }, null, 2));
  } catch (error) {
    util.log(colors.red(`Cities API : search:  Error while searching Cities for: ${JSON.stringify(req.query)}: ${error.stack ? error.stack : error}`));
    res.status(400).send({
      message: `Error while searching Cities for: ${JSON.stringify(req.query)}: ${error}`,
    });
  }
}