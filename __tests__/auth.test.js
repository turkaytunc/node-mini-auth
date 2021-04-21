import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterEach, beforeEach } from '@jest/globals';
import app from '../src/app.js';
import User from '../src/db/User.js';

dotenv.config();

const { DB_TEST_URL } = process.env;

beforeEach((done) => {
  mongoose.connect(
    DB_TEST_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done(),
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
describe('/auth/register', () => {
  describe('POST', () => {
    it('should create and return new user with correct fields ', async () => {
      try {
        const user = new User({
          password: 'pass123',
          username: 'Jeff',
          email: 'jeff@jeff.com',
        });

        const response = await supertest(app)
          .post('/auth/register')
          .send({
            password: 'pass123',
            username: 'Jeff',
            email: 'jeff@jeff.com',
          })
          .expect(200);
        expect(response.body.email).toBe(user.email);
        expect(response.body.username).toBe(user.username);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
