import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookies());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});