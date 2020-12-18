import { Request, Response } from 'express';
import knex from '../database/connection';

class ProfessionalsController {

    async create (request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            about,
            lat,
            long,
            city,
            uf,
            services
        } = request.body;

        const trx = await knex.transaction();

        const professional = {
            image: 'https://images.unsplash.com/photo-1489514354504-1653aa90e34e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            about,
            lat,
            long,
            city,
            uf
        };
    
        const insertedIds = await trx('professionals').insert(professional);
    
        const professional_id = insertedIds[0];
    
        const professionalsServices = services.map((service_id: number) =>{
            return {
                service_id,
                professional_id
            };
        });
    
        await trx('professionals_services').insert(professionalsServices);
        // essencial para trx dar certo
        await trx.commit();
    
        return response.json({
            id: professional_id,
            ...professional,
        });
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const professional = await knex('professionals').where('id', id).first();

        if(!professional){
            return response.status(400).json({ message: 'Professional not found' });
        }

        const services = await knex('services')
        .join('professionals_services', 'services.id', '=', 'professionals_services.service_id')
        .where('professionals_services.professional_id', id)
        .select('services.title');

        return response.json({ professional, services });
    }

    async index(request: Request, response: Response){
        const { city, uf, services } = request.query;

        const parsedServices = String(services)
            .split(',')
            .map(service => Number(service.trim()));

        const professionals = await knex('professionals')
            .join('professionals_services', 'professionals.id', '=', 'professionals_services.professional_id')
            .whereIn('professionals_services.service_id', parsedServices)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('professionals.*');

        return response.json(professionals);
    }

}

export default ProfessionalsController;