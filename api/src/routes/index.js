import express from "express";
import makeExpressCallback from "../helpers/expressCallback.js";
import notFound from "../controllers/not-found.js";
import missionsRoutes from "./missionsRoutes.js"
import usersRoutes from "./usersRoutes.js"

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.send({status: "server up and running"})
    })

    app.use(
        express.json(),
        missionsRoutes,
        usersRoutes
    )
    app.use(makeExpressCallback(notFound))
}

export default routes;