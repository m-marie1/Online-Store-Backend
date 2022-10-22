"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStore = void 0;
const database_1 = __importDefault(require("../database"));
const hash_function_1 = require("../utilities/hash_function");
class userStore {
    async index() {
        // Show all users
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`couldn't get users ${err}`);
        }
    }
    async show(id) {
        // Show user info by his id
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        // Create a new user and hash his password
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *';
            const hash = (0, hash_function_1.getHashedPassword)(u.password);
            const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${u.first_name + u.last_name}): ${err}`);
        }
    }
}
exports.userStore = userStore;
