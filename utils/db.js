const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGODB_URL || process.env.DB_HOST, {})
  .then(() => console.log("DB connection successful!"));
  module.exports = mongoose