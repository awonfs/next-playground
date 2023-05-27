import express, { Request, Response } from "express";
import { getData, createData } from "./controllers/dataController";
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/data", getData);
app.post("/api/create", createData);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
