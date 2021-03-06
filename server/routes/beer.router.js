const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * *
 * GET routes
 * *
 */
// GET random beer to present to user on home page
router.get('/random/', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('***Hit the random Beer endpoint***');
  console.log('req.params', req.params);
  console.log('isAuthenticated', req.isAuthenticated());
  console.log('user is', req.user);

  let queryText = `
    SELECT "beers".id as "beer_id", "beers".name as "beer", "styles".style_name, 
      "breweries".name as "brewery", "breweries".image_url as "image", "breweries".image_desc as "image_desc"
      FROM "beers" 
    JOIN "styles" ON "style_id" = "styles".id
    JOIN "breweries" ON "brewery_id" = "breweries".id
    WHERE "beers".user_added = false
    ORDER BY RANDOM ()  
    LIMIT 1 ;
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

// GET characteristics that are associated with beer types
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

// GETS the details of random beer that user clicked
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('***Hit beer details endpoint***');

  let queryText = `
    SELECT "beers".id as "beer_id", "beers".name as "beer", "beers".dominant_flavor_id as "dominant_flavor", 
      "dominant_flavors".flavor_name,
      "styles".style_name, 
      "breweries".name as "brewery", "breweries".image_url as "image", "breweries".image_desc as "image_desc",
      "user_beers".has_tried, "user_beers".is_liked, "user_beers".user_id,
      ARRAY_AGG("characteristics".characteristic)
    FROM "beers" 
    JOIN "styles" ON "style_id" = "styles".id
    JOIN "breweries" ON "brewery_id" = "breweries".id
    JOIN "dominant_flavors" ON "dominant_flavors".id = "beers".dominant_flavor_id
    JOIN "beer_characteristics" ON "beer_id" = "beers".id
    JOIN "characteristics" ON "characteristics".id = "beer_characteristics".characteristic_id
    FULL OUTER JOIN "user_beers" ON "user_beers".beer_id = "beers".id
    WHERE "beers".id = $1
    GROUP BY "beers".id,
      "dominant_flavors".flavor_name,
      "styles".style_name,
      "breweries".name,
      "breweries".image_url,
      "breweries".image_desc,
      "user_beers".has_tried,
      "user_beers".is_liked,
      "user_beers".user_id; 
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

// GET user beers to list out
router.get('/userbeers', rejectUnauthenticated, (req, res) => {
  // res.sendStatus(200); // For testing only, can be removed

  console.log('***Hit beer details endpoint***');
  console.log('req.user.id', req.user.id);

  let queryText = `
  SELECT "beers".id as "beer_id", "beers".name as "beer", "beers".style_id as "beer_style", "beers".dominant_flavor_id as 	"dominant_flavor",
	"user_beers".has_tried as "has_tried", "user_beers".is_liked as "is_liked",
    "breweries".name as "brewery", "breweries".image_url as "image", "breweries".image_desc as "image_desc",
    "styles".style_name,
    ARRAY_AGG("characteristics".characteristic) as "flavor_array"
  FROM "beers" 
  JOIN "styles" ON "style_id" = "styles".id
  JOIN "breweries" ON "brewery_id" = "breweries".id
  JOIN "user_beers" ON "user_beers".beer_id = "beers".id
  JOIN "beer_characteristics" ON "beer_characteristics".beer_id = "beers".id
  JOIN "characteristics" ON "characteristics".id = "beer_characteristics".characteristic_id
  WHERE "user_beers".user_id = $1
  GROUP BY "beers".id, "user_beers".has_tried, "user_beers".is_liked, "breweries".name, "breweries".image_url, "breweries".image_desc, "styles".style_name
  ORDER BY "beers".name; 
  `;

  pool
    .query(queryText, [req.user.id,])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// GET all beers from the DB
router.get('/allbeers', rejectUnauthenticated, (req, res) => {
  console.log('***Hit all beers endpoint***');

  let queryText = `
  SELECT "beers".id as "beer_id", "beers".name as "beer", "beers".style_id as "style_id", 
    "beers".dominant_flavor_id as "dominant_flavor_id",
    "styles".style_name, 
    "breweries".name as "brewery", 
    "breweries".image_url as "image",
    "breweries".image_desc as "image_desc",
    ARRAY_AGG("characteristics".characteristic) as "flavor_array"
  FROM "beers" 
  JOIN "styles" ON "style_id" = "styles".id
  JOIN "breweries" ON "brewery_id" = "breweries".id
  JOIN "beer_characteristics" ON "beer_characteristics".beer_id = "beers".id
  JOIN "characteristics" ON "characteristics".id = "beer_characteristics".characteristic_id
  FULL OUTER JOIN "user_beers" ON "user_beers".beer_id = "beers".id
  WHERE ("beers".user_added = false)
  GROUP BY "beers".id, "breweries".name, "breweries".image_url, "breweries".image_desc, "styles".style_name
  ORDER BY "beers".name, "breweries".name;
  `;

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
 * *
 * POST routes
 * *
 */
// POSTS new beer that USER entered
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

// POST when user saves a random beer presented to them
router.post('/savebeer', rejectUnauthenticated, (req, res) => {
  console.log('req.body', req.body);
  let has_tried = req.body.has_tried;
  if (req.body.has_tried === null) {
    has_tried = false;
  }

  const queryText = `
    INSERT INTO "user_beers" ("user_id", "beer_id", "has_tried", "is_liked")
      VALUES ($1, $2, $3, $4);
  `
  pool
    .query(queryText, [req.user.id, req.body.id, has_tried, req.body.is_liked])
    .then((result) => {
      console.log('Successful POST - save beer');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('ERROR in save beer POST', error);
      res.sendStatus(500);
    });
});

// POSTS new beer that ADMIN entered
router.post('/adminaddbeer', rejectUnauthenticated, (req, res) => {
  const name = req.body.name;
  const style = req.body.style_name;
  const brewery = req.body.brewery_name;
  const flavor = req.body.dominant_flavor;
  const characteristicOne = req.body.characteristicOne;
  const characteristicTwo = req.body.characteristicTwo;
  const characteristicThree = req.body.characteristicThree;
  const user_added = req.body.user_added;

  console.log('*HIT ADMIN ADD*');
  console.log('req.user', req.user);

  let queryText = '';

  if(req.user.authLevel === 'ADMIN') {
  queryText = `
    WITH ins AS (INSERT INTO "characteristics" ("characteristic")
      VALUES ($1), ($2), ($3) ON CONFLICT ("characteristic") DO NOTHING)
    
    INSERT INTO "styles" ("style_name")
      VALUES ($4) ON CONFLICT ("style_name") DO NOTHING;
    `

  }
  pool
    .query(queryText, [characteristicOne, characteristicTwo, characteristicThree, style])
    .then((result) => {
      let queryTwo = ""
      if(req.user.authLevel === 'ADMIN') {
      queryTwo = `
      WITH ins AS (INSERT INTO "beers" ("name", "style_id", "dominant_flavor_id", "brewery_id", "user_added")
        VALUES ($1, (SELECT "id" FROM "styles" WHERE "style_name"=$2), 
        (SELECT "id" FROM "dominant_flavors" WHERE "flavor_name"=$4),
        (SELECT "id" FROM "breweries" WHERE "name"=$3), $8) RETURNING "id")
    
      INSERT INTO "beer_characteristics" ("beer_id", "characteristic_id")
        VALUES ((SELECT "id" FROM "ins"), (SELECT "id" FROM "characteristics" WHERE "characteristic"=$5)),
        ((SELECT "id" FROM "ins"), (SELECT "id" FROM "characteristics" WHERE "characteristic"=$6)),
        ((SELECT "id" FROM "ins"), (SELECT "id" FROM "characteristics" WHERE "characteristic"=$7));
      `};
      pool
        .query(queryTwo, [name, style, brewery, flavor, characteristicOne, characteristicTwo, characteristicThree, user_added])
        .then((result) => {
        console.log('Successful POST - add beer ADMIN');
        res.sendStatus(201);
        })
        .catch((error) => {
          console.log('ERROR in second Pool ADMIN POST', error);
          res.sendStatus(500);
        })
    })
    .catch((error) => {
      console.log('ERROR in first Pool ADMIN POST', error);
      res.sendStatus(500);
    });
});

/**
 * *
 * DELETE routes
 * *
 */
// Delete a beer
router.delete('/deleteBeer/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `
    DELETE FROM "user_beers"
    WHERE "beer_id"=$2 AND "user_id"=$1;
  `
  pool
    .query(queryText, [req.user.id, req.params.id])
    .then((result) => {
      console.log('Successful DELETE');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('ERROR in DELETE', error);
      res.sendStatus(500);
    });
});

/**
 * *
 * PUT route
 * *
 */
router.put('/editBeerStatus', rejectUnauthenticated, (req, res) => {
  const has_tried = req.body.tried_status;
  const is_liked = req.body.like_status;
  const beer_id = req.body.beer_id;
  const user_id = req.user.id;
  
  console.log('*PUT* req.body', req.body);
  const queryText = `
    UPDATE "user_beers"
    SET "has_tried" = $1, "is_liked" = $2
    WHERE "beer_id"=$3 AND "user_id"=$4;
  `
  pool
    .query(queryText, [has_tried, is_liked, beer_id, user_id])
    .then((result) => {
      console.log('Successful PUT');
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('ERROR in PUT', error);
      res.sendStatus(500);
    });
});


module.exports = router;