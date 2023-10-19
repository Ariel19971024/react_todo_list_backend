const express = require("express");
const { v4: uuidv4 } = require("uuid");
const List = require("../schema/todo.js");
var router = express.Router();

/* GET home page. */
let todo = [
  {
    id: uuidv4(),
    text: "do something",
    date: "2023-10-24",
  },
];

router
  .get("/todo", (req, res) => {
    List.find({})
      .exec()
      .then((data) => {
        res.send(data);
      }).catch((e)=>{
        res.status(400).send(e)
      });
  
  })

  .post("/todo", async (req, res) => {
    try {
      console.log({ ...req.body, created_date: new Date() });
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
  .delete('/todo/:id',(req,res)=>{
    console.log(req)
  })
  ;

module.exports = router;
