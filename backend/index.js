const express = require("express");
const cors = require("cors");
const UserRouter = require("./Routes/userRoute");
const connectDB = require("./Config/db");
const CategoryRouter = require("./Routes/categoryRoute.");
const ProductRouter = require("./Routes/productRoute");
const dotenv = require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", ProductRouter);
// app.get("/", async (req, res) => {
//   res.send("Welcome ARBA");
// });

const Port = process.env.PORT || 5000;
app.listen(Port, async () => {
  console.log(`Server started at http://localhost:${Port}`);
});
