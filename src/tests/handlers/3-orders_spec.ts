import app from '../../server';
import supertest from 'supertest';
import { token } from './1-users_spec';

const request = supertest(app);

describe('Test orders handler', function () {
  it('Creates an order and sends its info back', async function () {
    const response = await request
      .post('/orders')
      .send({ status: 'open', user_id: 1 })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });

  it('Gets orders by user id', async function () {
    const response = await request
      .get('/orders/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].status).toBe('open');
    expect(response.body[0].user_id).toBe(1);
    expect(response.body.length).toBe(1);
  });

  it('Adds a produuct to an open order', async function () {
    const response = await request
      .post('/orders/1/products')
      .send({ quantity: 15, product_id: 1 })
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.id).toBe(1);
    expect(response.body.quantity).toBe(15);
    expect(response.body.product_id).toBe(1);
  });
});
