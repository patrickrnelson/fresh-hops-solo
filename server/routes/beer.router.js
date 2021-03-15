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
      SELECT * FROM "beers"
      WHERE beer_id = $1;
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;