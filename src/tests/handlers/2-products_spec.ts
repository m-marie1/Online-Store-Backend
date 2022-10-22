import app from '../../server';
import { token } from './1-users_spec';
import supertest from 'supertest';

const request = supertest(app);

describe('Test products handler', function () {
  it('Creates a product and sends it back', async function () {
    const response = await request
      .post('/products')
      .send({ name: 'Lofe shirt I support Buffoonery', price: 30 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it('Gets all products', async function () {
    const response = await request.get('/products/').expect(200);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].name).toBe('Lofe shirt I support Buffoonery');
    expect(response.body[0].price).toBe(30);
    expect(response.body.length).toBe(1);
  });

  it('Gets a single product by id', async function () {
    const response = await request.get('/products/1').expect(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('Lofe shirt I support Buffoonery');
    expect(response.body.price).toBe(30);
  });
});
