import { User, userStore } from '../../models/1-user';

const store = new userStore();

describe('Test Users Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('Creates a user and sends his info back', async function () {
    const createUser = await store.create({
      first_name: 'Ramses',
      last_name: 'The second',
      password: 'testPassword',
    });

    expect(createUser.id).toEqual(2);
    expect(createUser.first_name).toEqual('Ramses');
    expect(createUser.last_name).toEqual('The second');
    expect(createUser.password).toBeDefined();
  });

  it('Shows all users', async function () {
    const showUsers = await store.index();

    expect(showUsers.length).toEqual(2);

    expect(showUsers[1].id).toEqual(2);
    expect(showUsers[1].first_name).toEqual('Ramses');
    expect(showUsers[1].last_name).toEqual('The second');

    expect(showUsers[0].id).toEqual(1);
    expect(showUsers[0].first_name).toEqual('Mo');
    expect(showUsers[0].last_name).toEqual('Marie');
  });

  it('Shows a user by id', async function () {
    const showUser1 = await store.show(1);

    expect(showUser1.id).toEqual(1);
    expect(showUser1.first_name).toEqual('Mo');
    expect(showUser1.last_name).toEqual('Marie');

    const showUser2 = await store.show(2);

    expect(showUser2.id).toEqual(2);
    expect(showUser2.first_name).toEqual('Ramses');
    expect(showUser2.last_name).toEqual('The second');
  });
});
