require('dotenv').config();
const pg = require('pg');

const { types } = pg;
types.setTypeParser(1114, (str) => str);

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

const { HttpError } = require('../helpers');

async function createBin(binPath) {
  const text = 'INSERT INTO bins (bin_path) VALUES ($1) RETURNING *';
  const value = [binPath];
  try {
    const newBin = await pool.query(text, value);
    return newBin.rows;
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`, 500);
  }
}

async function getBinId(binPath) {
  const text = 'SELECT id FROM bins WHERE bin_path = $1';
  const value = [binPath];
  try {
    const response = await pool.query(text, value);
    const bin = response.rows[0];
    if (bin === undefined) {
      throw Error;
    }
    return bin.id;
  } catch (err) {
    throw new HttpError('Error: Bin does not exist', 400);
  }
}

async function createRequest(binId, mongoId, httpMethod, httpPath) {
  const text = 'INSERT INTO requests (bin_id, mongo_id, http_method, http_path) VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [binId, mongoId, httpMethod, httpPath];
  try {
    const result = await pool.query(text, value);
    return result.rows[0];
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`);
  }
}

async function getAllRequestsInBin(binPath) {
  const binId = await getBinId(binPath);
  const text = 'SELECT * FROM requests WHERE bin_id = $1 ORDER BY received_at DESC';
  const value = [binId];
  try {
    const response = await pool.query(text, value);
    const requests = response.rows; // response['rows'] returns an array of objects
    return requests;
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`);
  }
}

// just a helper for internal testing use
async function deleteAllRequests() {
  const text = 'DELETE FROM requests';
  try {
    await pool.query(text);
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`);
  }
}

async function getRequest(requestId) {
  const text = 'SELECT * FROM requests WHERE id = $1';
  const value = [requestId];

  try {
    const response = await pool.query(text, value);
    const request = response.rows[0];
    if (request === undefined) {
      throw Error;
    }
    return request;
  } catch (err) {
    throw new HttpError('Request does not exist', 400);
  }
}

async function deleteAllRequestsInBin(binPath) {
  const binId = await getBinId(binPath);

  const text = 'DELETE FROM requests WHERE bin_id = $1';
  const value = [binId];
  try {
    await pool.query(text, value);
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`);
  }
}

async function deleteRequest(id) {
  const text = 'DELETE FROM requests WHERE id = $1';
  const value = [id];
  try {
    await pool.query(text, value);
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`);
  }
}

async function deleteBin(binPath) {
  const binId = await getBinId(binPath);
  const text = 'DELETE FROM bins WHERE id = $1';
  const value = [binId];
  try {
    await deleteAllRequestsInBin(binPath);
    await pool.query(text, value);
  } catch (err) {
    throw new HttpError(`Error: ${err.message}`);
  }
}

module.exports = {
  createBin,
  getBinId,
  createRequest,
  getAllRequestsInBin,
  deleteAllRequests,
  deleteAllRequestsInBin,
  deleteBin,
  deleteRequest,
  getRequest,
};
