const express = require("express");
const { v4: uuidv4 } = require("uuid");
const List = require("../schema/todo.js");
var router = express.Router();

router
  .get("/todo", (req, res) => {
    List.find({})
      .exec()
      .then((data) => {
        res.send({ status: "200", data, msg: "success" });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .post("/todo", async (req, res) => {
    try {
      const target = new List({
        id: uuidv4(),
        ...req.body,
      });
      await target.save();
      res.send({ status: "200", data: null, msg: "add success" });
    } catch (e) {
      console.log(e);
      res.status(404).send(e);
    }
  })
  .post("/sort", async (req, res) => {
    console.log(req.body);
    List.find()
      .sort({ [req.body.field]: req.body.sort })
      .exec()
      .then((data) => {
        res.send({ status: "200", data, msg: "success" });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })
  .delete("/todo/:id", (req, res) => {
    //可以拆成Controller
    List.deleteOne({ id: req.params.id }).then((msg) => {
      res.send({ status: "200", msg: "delete success" });
    });
  })
  .put("/todo/:id", (req, res) => {
    List.updateOne(
      {
        id: req.params.id,
      },
      {
        text: req.body.text,
      }
    ).then((data) => {
      res.send({ status: "200", msg: "update success" });
    });
  });

module.exports = router;
