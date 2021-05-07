'use strict';

const express = require('express');

const optionsRouter = express.Router();
const optionsModel = require('../models/options/options-collection.js');

//options Routes
optionsRouter.post('/options', (req, res) => {
  optionsModel.create(req.body).then((data) => {
    res.status(201).json(data);
  });
});
optionsRouter.get('/options', (req, res) => {
  optionsModel.get().then((data) => {
    const count = data.length;
    res.status(200).json({ count, data });
  });
});
optionsRouter.get('/options/:id', (req, res) => {
  let id = req.params.id;
  optionsModel.get(id).then((data) => {
    res.status(200).json(data[0]);
  });
});
optionsRouter.put('/options/:id', (req, res) => {
  let id = req.params.id;
  optionsModel.update(id, req.body).then(() => {
    optionsModel.get(id).then((data) => {
      res.status(200).json(data[0]);
    });
  });
});
optionsRouter.delete('/options/:id', (req, res) => {
  let id = req.params.id;
  optionsModel.delete(id).then(() => {
    optionsModel.get().then((data) => {
      const count = data.length;
      res.status(200).json({ count, data });
    });
  });
});

module.exports = optionsRouter;