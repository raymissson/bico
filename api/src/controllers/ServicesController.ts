import knex from '../database/connection';
import { Request, Response } from 'express';

class ServicesController {
    async index (request: Request, response: Response) {
        const services = await knex('services').select('*');
    
        const serializedServices = services.map(service => {
            return {
                id: service.id,
                title: service.title,
                image_url: `http://localhost:3333/uploads/${service.image}`
            }
        })
    
        return response.json(serializedServices);
    
    }
}

export default ServicesController;