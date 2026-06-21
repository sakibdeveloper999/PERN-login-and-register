import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();

app.use(
  cors({
   origin: process.env.CLIENT_URL|| "http://localhost:5173",
   credentials: true,
 })
);

app.use(express.json());
app.use(cookies());



const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});