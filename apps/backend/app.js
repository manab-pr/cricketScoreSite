require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');


const express = require("express");
const app = express();

const ConnectDB = require("./db/connect");
const authenticateUser = require("./middlewares/authentication");
const isAdmin =require('./middlewares/is-admin')
//routers
const authRouter = require("./routes/auth");
const scorecardRouter = require("./routes/userscore");
const adminscorecardRouter =require("./routes/adminscore");

//error handler
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");




app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routes
app.get("/", (req, res) => {
  res.send("cricketScore api");
});

app.use("/api/v1/auth", authRouter);
app.use('/api/v1',authenticateUser,scorecardRouter); // users can access this routes
app.use('/api/v1',authenticateUser,isAdmin,adminscorecardRouter);         //only admin can access this routes

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await ConnectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
