/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const { HttpError } = require('../helpers');

const requestSchema = new Schema({
  payload: { type: Object },
});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Request = mongoose.model('Request', requestSchema);

async function deleteRequest(mongoId) {
  try {
    await Request.findByIdAndDelete(mongoId);
  } catch (err) {
    throw new HttpError(`Error: ${err}`, 500);
  }
}

async function createRequest(payload) {
  const newRequest = new Request({
    payload,
  });

  try {
    const result = await newRequest.save();
    return result.toJSON();
  } catch (err) {
    throw new HttpError(`Error: ${err}`, 500);
  }
}

async function getRequest(id) {
  try {
    const result = await Request.findById(id);
    if (result != null) {
      return result.toJSON();
    }
    return result;
  } catch (err) {
    throw new HttpError(`Error: ${err}`, 500);
  }
}

module.exports = {
  Request,
  deleteRequest,
  createRequest,
  getRequest,
};
