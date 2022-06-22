import express from "express";
import makeExpressCallback from "../helpers/expressCallback.js";
import UserController from "../controllers/usersController.js";

const router = express.Router();


router
    .get("/users", makeExpressCallback(UserController.getUsers))
    .post("/users", makeExpressCallback(UserController.addUser))
    .delete("/users/:id", makeExpressCallback(UserController.deleteUser))

export default router;