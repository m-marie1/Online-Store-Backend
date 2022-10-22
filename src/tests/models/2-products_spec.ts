import { Product, productStore } from '../../models/2-product';

const store = new productStore();

describe('Test Products Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('Creates a product and sends its info back', async function () {
    const createProduct = await store.create({ name: 'Chair', price: 50 });

    expect(createProduct).toEqual({ id: 2, name: 'Chair', price: 50 });
  });

  it('Shows all products', async function () {
    const showProducts = await store.index();

    expect(showProducts.length).toEqual(2);
    expect(showProducts).toEqual([
      { id: 1, name: 'Lofe shirt I support Buffoonery', price: 30 },
      { id: 2, name: 'Chair', price: 50 },
    ]);
  });

  it('Shows a product by id', async function () {
    const showProduct1 = await store.show(1);

    expect(showProduct1).toEqual({
      id: 1,
      name: 'Lofe shirt I support Buffoonery',
      price: 30,
    });

    const showProduct2 = await store.show(2);

    expect(showProduct2).toEqual({ id: 2, name: 'Chair', price: 50 });
  });
});
