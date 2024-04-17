const express = require("express");
const cors = require("cors");
const UserRouter = require("./Routes/userRoute");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", UserRouter);
app.get("/", async (req, res) => {
  res.send("Welcome ARBA");
});

const Port = process.env.port || 5000;
app.listen(Port, async () => {
  console.log(`Server started at http://localhost:${Port}`);
});
