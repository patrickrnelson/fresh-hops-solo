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
    SELECT "beers".id as "beer_id", "beers".name as "beer", "styles".style_name, "breweries".name as "brewery", "breweries".image_url as "image" FROM "beers" 
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

// GET characteristics
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

// GET characteristics
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('***Hit beer details endpoint***');

  let queryText = `
  SELECT "beers".id as "beer_id", "beers".name as "beer", "beers".dominant_flavor_id as "dominant_flavor", 
    "dominant_flavors".flavor_name,
    "styles".style_name, 
    "breweries".name as "brewery", "breweries".image_url as "image", 
    ARRAY_AGG("characteristics".characteristic)
  FROM "beers" 
  JOIN "styles" ON "style_id" = "styles".id
  JOIN "breweries" ON "brewery_id" = "breweries".id
  JOIN "dominant_flavors" ON "dominant_flavors".id = "beers".dominant_flavor_id
  JOIN "beer_characteristics" ON "beer_id" = "beers".id
  JOIN "characteristics" ON "characteristics".id = "beer_characteristics".characteristic_id
  WHERE "beers".id = $1
  GROUP BY "beers".id,
    "dominant_flavors".flavor_name,
    "styles".style_name,
    "breweries".name,
    "breweries".image_url; 
  `;

  pool
    .query(queryText, [req.params.id])
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
router.post('/addnew', rejectUnauthenticated, (req, res) => {
  const name = req.body.name;
  const style = req.body.style_name;
  const brewery = req.body.brewery_name;
  const flavor = req.body.flavor;
  const characteristicOne = req.body.characteristicOne;
  const characteristicTwo = req.body.characteristicTwo;
  const characteristicThree = req.body.characteristicThree;
  const triedStatus = req.body.triedStatus;
  const likeStatus = req.body.likeStatus;

  const queryText = `
    WITH ins AS (INSERT INTO "beers" ("name", "style_id", "dominant_flavor_id", "brewery_id")
      VALUES ($1, (SELECT "id" FROM "styles" WHERE "style_name"=$2), 
      (SELECT "id" FROM "dominant_flavors" WHERE "flavor_name"=$4),
      (SELECT "id" FROM "breweries" WHERE "name"=$3)) RETURNING "id"),
    
    ins2 AS (INSERT INTO "beer_characteristics" ("beer_id", "characteristic_id")
      VALUES ((SELECT "id" FROM "ins"), (SELECT "id" FROM "characteristics" WHERE "characteristic"=$5)),
      ((SELECT "id" FROM "ins"), (SELECT "id" FROM "characteristics" WHERE "characteristic"=$6)),
      ((SELECT "id" FROM "ins"), (SELECT "id" FROM "characteristics" WHERE "characteristic"=$7)) 
    )
    INSERT INTO "user_beers" ("user_id", "beer_id", "is_liked", "has_tried")
      VALUES ($8, (SELECT "id" FROM "ins"), $10, $9);
  `
  pool
    .query(queryText, [name, style, brewery, flavor, characteristicOne, characteristicTwo, characteristicThree, req.user.id, triedStatus, likeStatus])
    .then((result) => {
      console.log('Successful POST - add beer');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('ERROR in add beer POST', error);
      res.sendStatus(500);
    });
});

router.post('/savebeer', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);

  const queryText = `
    INSERT INTO "user_beers" ("user_id", "beer_id", "has_tried")
      VALUES ($1, $2, false);
  `
  pool
    .query(queryText, [req.user.id, req.body.id])
    .then((result) => {
      console.log('Successful POST - save beer');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('ERROR in add beer POST', error);
      res.sendStatus(500);
    });
});

module.exports = router;