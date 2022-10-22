import app from '../../server';
import supertest from 'supertest';

const request = supertest(app);

export let token: string = '';

describe('Test users handler', function () {
  it('Creates a user and sends a token back', async function () {
    const response = await request
      .post('/users')
      .send({ firstName: 'Mo', lastName: 'Marie', password: 'testPassword' });
    token = response.body;
    console.log(token);
    expect(response.status).toEqual(200);
  });

  it('Shows all users', async function () {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].first_name).toBe('Mo');
    expect(response.body[0].last_name).toBe('Marie');
    expect(response.body[0].password).toBeDefined();
    expect(response.body.length).toBe(1);
  });

  it('A test that shows a single user by id', async function () {
    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(response.body.id).toBe(1);
    expect(response.body.first_name).toBe('Mo');
    expect(response.body.last_name).toBe('Marie');
  });
});
