const express = require('express');

const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const postgres = require('../db/postgres_utils');
const mongoDb = require('../db/mongo_utils');

router.get('/:bin_path/requests', async (req, res, next) => {
  const binPath = req.params.bin_path;
  try {
    const result = await postgres.getAllRequestsInBin(binPath);
    res.json(result);
  } catch (error) {
    return next(error);
  }
});

router.get('/requests/:request_id', async (req, res, next) => {
  const requestId = req.params.request_id;
  try {
    const request = await postgres.getRequest(requestId);
    const mongoId = request.mongo_id;
    const result = await mongoDb.getRequest(mongoId);
    res.json(result);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  const binPath = uuidv4();
  try {
    const result = await postgres.createBin(binPath);
    res.json(result);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:bin_path', async (req, res, next) => {
  const binPath = req.params.bin_path;
  try {
    const allRequests = await postgres.getAllRequestsInBin(binPath);
    const promises = allRequests.map((request) => mongoDb.deleteRequest(request.mongo_id));
    promises.push(postgres.deleteBin(binPath));
    await Promise.all(promises);
    return res.json({ success: 'ok' });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:bin_path/requests/:request_id', async (req, res, next) => {
  const requestId = req.params.request_id;
  try {
    const request = await postgres.getRequest(requestId);
    await mongoDb.deleteRequest(request.mongo_id);
    await postgres.deleteRequest(requestId);
    res.json({ success: 'ok' });
  } catch (error) {
    next(error);
  }
});

router.delete('/:bin_path/requests', async (req, res, next) => {
  const binPath = req.params.bin_path;
  try {
    const allRequests = await postgres.getAllRequestsInBin(binPath);
    const promises = allRequests.map((request) => mongoDb.deleteRequest(request.mongo_id));
    promises.push(postgres.deleteAllRequestsInBin(binPath));
    await Promise.all(promises);
    return res.json({ success: 'ok' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
