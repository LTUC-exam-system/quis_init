'use strict';

const express = require('express');

const optionsRouter = express.Router();
const optionsModel = require('../models/options/options-collection.js');
const bearer=require('../middleware/bearer');
const authorized=require('../middleware/authorize');
//options Routes
optionsRouter.post('/options/:id',bearer,authorized('create'), (req, res) => {
  let id=req.params.id;
  let img;
  if(req.body.image){
    img=req.body.image
  }else{
    img=""
  }
  optionsModel.create({option_id:id,option:req.body.option,correct:req.body.correct,image:img}).then((data) => {
    res.status(201).json(data);
  });
});
// optionsRouter.get('/options',bearer,authorized('read'), (req, res) => {
//   optionsModel.get().then((data) => {
//     const count = data.length;
//     res.status(200).json({ count, data });
//   });
// });
optionsRouter.get('/options/:id',bearer,authorized('read'), (req, res) => {
  let id = req.params.id;
  optionsModel.get(id).then((data) => {
    res.status(200).json(data);
  });
});
optionsRouter.put('/options/:id',bearer,authorized('update'), (req, res) => {
  let id = req.params.id;
  optionsModel.update(id, req.body).then(() => {
    optionsModel.get(id).then((data) => {
      res.status(200).json(data[0]);
    });
  });
});
optionsRouter.delete('/options/:id',bearer,authorized('delete'), (req, res) => {
  let id = req.params.id;
  optionsModel.delete(id).then(() => {
    optionsModel.get().then((data) => {
      const count = data.length;
      res.status(200).json({ count, data });
    });
  });
});

module.exports = optionsRouter;