const connection = require("../utils/db")
const listSchema = connection.Schema({
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
    trim: true,
  },
  priority: {
      type: Number,
  },
});

const List = connection.model("List", listSchema);

module.exports = List;
