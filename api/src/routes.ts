import express from 'express';

import ProfessionalsController from './controllers/ProfessionalsController';
import ServicesController from './controllers/ServicesController';

const routes = express.Router();
const professionlasController = new ProfessionalsController();
const servicesController = new ServicesController();

routes.get('/services', servicesController.index);
routes.post('/professionals', professionlasController.create);
routes.get('/professionals/:id', professionlasController.show);
routes.get('/professionals', professionlasController.index);

export default routes;