import Client from '../database';
import { getHashedPassword } from '../utilities/hash_function';

export type User = {
  // id as an optional paramter to test the function without passing the id so we test creating a user and give to the post route user info without the id and the response should give us the right id that we expect with jasmine.
  id?: Number;
  first_name: string;
  last_name: string;
  password: string;
};

export class userStore {
  async index(): Promise<User[]> {
    // Show all users
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`couldn't get users ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    // Show user info by his id
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    // Create a new user and hash his password
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';

      const hash = getHashedPassword(u.password);

      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.first_name + u.last_name}): ${err}`
      );
    }
  }
}
