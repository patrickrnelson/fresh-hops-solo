const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/random/:num', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('***Hit the random Beer endpoint***');
  console.log('req.params', req.params);
  console.log('isAuthenticated', req.isAuthenticated());
  console.log('user is', req.user);

  let queryText = `
    SELECT "beers".name as "beer", "styles".style_name, "breweries".name as "brewery", "breweries".image_url as "image" FROM "beers" 
    JOIN "styles" ON "style_id" = "styles".id
    JOIN "breweries" ON "brewery_id" = "breweries".id
    WHERE "beers".id = $1;
  `;

  // get the id of the logged in user
  // let userId = req.user.id;

  pool
    .query(queryText, [req.params.num])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// get characteristics
router.get('/characteristics/', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('***Hit characteristics endpoint***');

  let queryText = `
    SELECT "style_name" as "type", ARRAY_AGG ("characteristics".characteristic) as "all_characteristics" FROM "styles"
    JOIN "style_characteristics" ON "styles".id = "style_characteristics".style_id
    JOIN "characteristics" ON "characteristics".id = "style_characteristics".characteristic_id
    GROUP BY "style_name";
  `;

  // get the id of the logged in user
  // let userId = req.user.id;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;