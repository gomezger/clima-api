import 'reflect-metadata';
import { StatusCodes } from 'http-status-codes';
import 'jest';
import { App } from '../App';
const request = require('supertest');

describe('Environment', () => {
    const app = new App();

    it('tests run correctly', async () => {
        expect(true).toBe(true);
    });

    it('can get server time', async () => {
        //act
        const response = await request(app.getExpressApp()).get('/api/prueba/');
        
        //assert
        expect(response.status).toBe(StatusCodes.OK);
    });

});