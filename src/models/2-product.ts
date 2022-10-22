import Client from '../database';

export type Product = {
  id?: Number;
  name: string;
  price: Number;
};

export class productStore {
  async index(): Promise<Product[]> {
    // show all peoducts
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`couldn't get products ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    // Show a product by its id
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    // Create a new product
    try {
      const sql =
        'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';

      const conn = await Client.connect();

      const result = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }
}
