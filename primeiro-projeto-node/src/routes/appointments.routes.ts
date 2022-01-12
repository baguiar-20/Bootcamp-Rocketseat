import { request, response, Router } from "express";

const appointmentsRouter = Router();
const appointments = [];

appointmentsRouter.post('/', (request, response)=>{

    const { provider, date } = request.body;

    const appointments = {
        provider,
        date
    }

    return response.json({ message: 'foiiii'})
});

export default appointmentsRouter;