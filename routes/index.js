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
      const user = new List({
        id: uuidv4(),
        ...req.body,
        created_date: new Date(),
      });
      await user.save();
      res.send(user);
    } catch (e) {
      console.log(e);
      res.status(404).send(e);
    }
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
