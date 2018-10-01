const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {
    console.log('IN ROUTEER');
    console.log('req', request.body);
    const entry = request.body.entry;
    console.log('HSHHSHSHSHSHSHS', entry)
    let sqlText = `INSERT INTO categories
    (category_name)
    VALUES ($1)`;
    pool.query(sqlText, [entry.category_name])
    .then((result) => {
   // console.log('Added entry:', result);
    response.sendStatus(201);
  }).catch((error) => {
  //  console.log('Error posting entry:', error);
    response.sendStatus(500);
  })
}); // end POST

router.get('/', (request, response) => {
    const sqlText = `SELECT * FROM categories`;
    pool.query(sqlText)
      .then(function(result) {
      //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function(error){
      //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  });


module.exports = router;