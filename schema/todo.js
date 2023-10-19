const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/todo", {})
  .then(() => console.log("DB connection successful!"));
const listSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    trim: true,
  },
  created_date: {
    type: Date,
    required: true,
    trim: true,
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
