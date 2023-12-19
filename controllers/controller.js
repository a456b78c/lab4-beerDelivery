const express = require('express');
const Beer = require('../models/model');
const router = express.Router();

// Інші імпорти

let succesfullOperation = (text) => {
  console.log(`${text}`);
};

const priceList = (req, res) => {
  Beer.find()
    .then((collection) => {
        succesfullOperation("Our priceList")
      res
        .status(200)
        .json(collection);
    })
    .catch((error) => console.log(`error is ${error}`));
};

const makeOrder = (req, res) => {
  const beer = new Beer(req.body);
  beer
    .save()
    .then((createdBeer) => {
        succesfullOperation("it is your purchase")
      res
        .status(200)
        .json({
          message: "Purchase successful",
          orderId: createdBeer._id,
          collection: createdBeer, 
        });
    })
    .catch((error) => console.log(`error is ${error}`));
};

const previewOrder = (req, res) => {
  Beer.findById(req.params.id)
    .then((collection) => {
        succesfullOperation("It is your purchase")
      res
        .status(200)       
        .json(collection);
    })
    .catch((error) => console.log(`error is ${error}`));
};

const editOrder = (req, res) => {
  Beer.findByIdAndUpdate(req.params.id, req.body)
    .then((collection) => {
        succesfullOperation("your purchase is edited")
      res
        .status(200)       
        .json(collection);
    })
    .catch((error) => console.log(`error is ${error}`));
};

const deleteOrder = (req, res) => {
  Beer.findByIdAndDelete(req.params.id)
    .then((collection) => {
        succesfullOperation("your purchase is deleted")
      res
        .status(200)       
        .json(collection);
    })
    .catch((error) => console.log(`error is ${error}`));
};

const Pay = (req, res) => {
    const beer = new Beer(req.body);
    beer
      .save()
      .then((createdBeer) => {
        succesfullOperation("your purchase is paid")
        res
          .status(200)          
          .json({
            message: "Payment successful",
            orderId: createdBeer._id,
            collection: createdBeer,
          });
      })
      .catch((error) => console.log(`error is ${error}`));
  };

// Виклик функцій тут

module.exports = {
    priceList,
    makeOrder,
    previewOrder,
    editOrder,
    deleteOrder,
    Pay,
};
