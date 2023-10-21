const express = require("express");
const { v4: uuidv4 } = require("uuid");
const List = require("../schema/todo.js");
var router = express.Router();

const HttpStatusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500,
};

router
  .get("/todo", (req, res, next) => {
    List.find({})
      .exec()
      .then((data) => {
        res.send({ status: "200", data, msg: "success" });
      })
      .catch((e) => {
        next({
          status: HttpStatusCode.INTERNAL_SERVER,
          message: "internal server error",
        });
      });
  })

  .post("/todo", async (req, res, next) => {
    try {
      const target = new List({
        id: uuidv4(),
        ...req.body,
      });
      await target.save();
      res.send({ status: "200", data: null, msg: "add success" });
    } catch (e) {
      next({
        status: HttpStatusCode.INTERNAL_SERVER,
        message: "internal server error",
      });
    }
  })
  .post("/sort", async (req, res, next) => {
    if (!["created_date", "priority"].includes(req.body.field))
      return next({
        status: HttpStatusCode.BAD_REQUEST,
        data: null,
        message: "field not found",
      });
    List.find()
      .sort({ [req.body.field]: req.body.sort })
      .exec()
      .then((data) => {
        res.send({ status: "200", data, message: "success" });
      })
      .catch((e) => {
        next({
          status: HttpStatusCode.INTERNAL_SERVER,
          message: "internal server error",
        });
      });
  })
  .delete("/todo/:id", (req, res, next) => {
    //可以拆成Controller
    List.deleteOne({ id: req.params.id })
      .then((msg) => {
        res.send({ status: "200", msg: "delete success" });
      })
      .catch((e) => {
        next({
          status: HttpStatusCode.INTERNAL_SERVER,
          message: "internal server error",
        });
      });
  })
  .put("/todo/:id", (req, res, next) => {
    List.updateOne(
      {
        id: req.params.id,
      },
      {
        text: req.body.text,
      }
    )
      .then((data) => {
        res.send({ status: "200", msg: "update success" });
      })
      .catch((e) => {
        next({
          status: HttpStatusCode.INTERNAL_SERVER,
          message: "internal server error",
        });
      });
  });

module.exports = router;
