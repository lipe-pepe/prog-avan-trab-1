import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

routes(app);

//TODO: implement authentication and authorization

export default app;