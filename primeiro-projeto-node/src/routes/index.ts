import { request, response, Router } from "express";

import appointmentsRouter from "./appointments.routes";

const routes = Router();

// routes.use("/appointments", appointmentsRouter);


routes.post("/appointments", (request, response) =>{
    return response.json({message: 'a'});
});


export default routes;
