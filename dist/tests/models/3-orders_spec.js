"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _3_order_1 = require("../../models/3-order");
const store = new _3_order_1.orderStore();
describe('Test Orders Model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an orderByUser method', () => {
        expect(store.orderByUser).toBeDefined();
    });
    it('should have an addOrder method', () => {
        expect(store.addProduct).toBeDefined();
    });
    it('Creates an order and sends its info back', async function () {
        const createOrder = await store.create({ status: 'complete', user_id: 2 });
        expect(createOrder).toEqual({ id: 2, status: 'complete', user_id: 2 });
    });
    it('Shows orders of a user by user id', async function () {
        const showOrders1 = await store.orderByUser(1);
        expect(showOrders1).toEqual([{ id: 1, status: 'open', user_id: 1 }]);
        const showOrder2 = await store.orderByUser(2);
        expect(showOrder2).toEqual([{ id: 2, status: 'complete', user_id: 2 }]);
    });
    it('Adds a produuct to an open order', async function () {
        const addProduct1 = await store.addProduct({
            quantity: 30,
            order_id: 1,
            product_id: 2,
        });
        expect(addProduct1).toEqual({
            id: 2,
            quantity: 30,
            order_id: 1,
            product_id: 2,
        });
    });
    it('Should throw an error when trying to add a product to an order whose status is complete', async function () {
        const addProduct2 = store.addProduct({
            quantity: 20,
            order_id: 2,
            product_id: 2,
        });
        await expectAsync(addProduct2).toBeRejectedWith(new Error('Could not add product 2 to order 2 because order status is complete'));
    });
});
