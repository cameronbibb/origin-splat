const express = require('express');

const router = express.Router();

const psqlDb = require('../db/postgres_utils');

const mongoDb = require('../db/mongo_utils');

function convertRequestToObject(request) {
  const obj = {
    headers: request.headers,
    body: request.body,
    method: request.method,
    path: request.path,
    query: request.query,
  };

  return obj;
}

router.all('/:bin_path/:remaining_path*?', async (req, res, next) => {
  const binPath = req.params.bin_path;
  const requestObject = convertRequestToObject(req);
  try {
    const binId = await psqlDb.getBinId(binPath);
    const mongoRequest = await mongoDb.createRequest(requestObject);
    const mongoId = mongoRequest.id;
    const newRequest = await psqlDb.createRequest(binId, mongoId, req.method, req.path);

    const io = req.app.get('socketio');
    io.to(binPath).emit('newRequest', newRequest);

    return res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
