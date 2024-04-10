const mongoose = require("mongoose");

const connection = ({ app, port }) => {
  // connecting to monngoDB
  const dbUrl =
    process.env.NODE_ENV === "development"
      ? "mongodb://localhost:27017/blog-node-tuts"
      : "mongodb+srv://akalmin247:mishima247@blog-node-tuts.k4jgjws.mongodb.net/";
  mongoose
    .connect(dbUrl, { autoIndex: true })
    .then(() => {
      app.listen(port);
      console.log("connected to database");
      console.log(`Server is running on port ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;
