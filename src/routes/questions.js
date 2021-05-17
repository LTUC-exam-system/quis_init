'use strict';

const express = require('express');

const questionRouter = express.Router();
const questionModel = require('../models/questions/questions-collection.js');
const bearer=require('../middleware/bearer');
const authorized=require('../middleware/authorize');
//questions Routes
questionRouter.post('/questions',bearer,authorized('create'), (req, res) => {
  questionModel.create(req.body).then((data) => {
    res.status(201).json(data);
  });
});
questionRouter.get('/questions',bearer,authorized('read'), (req, res) => {
  questionModel.get().then((data) => {
    const count = data.length;
    res.status(200).json({ count, data });
  });
});
questionRouter.get('/questions/:id',bearer,authorized('read'), (req, res) => {
  let id = req.params.id;
  questionModel.get(id).then((data) => {
    res.status(200).json(data[0]);
  });
});
questionRouter.put('/questions/:id',bearer,authorized('update'), (req, res) => {
  let id = req.params.id;
  questionModel.update(id, req.body).then(() => {
    questionModel.get(id).then((data) => {
      res.status(200).json(data[0]);
    });
  });
});
questionRouter.delete('/questions/:id',bearer,authorized('delete'), (req, res) => {
  let id = req.params.id;
  questionModel.delete(id).then(() => {
    questionModel.get().then((data) => {
      const count = data.length;
      res.status(200).json({ count, data });
    });
  });
});

module.exports = questionRouter;