const express = require('express');
const httpStatus = require('http-status');

const router = express.Router();

router.all('/', (_, res) =>
  res.status(httpStatus.OK).send({
    message: 'En hora buena, nuestra app funciona.',
    status: 'live',
  })
);

module.exports = router;
