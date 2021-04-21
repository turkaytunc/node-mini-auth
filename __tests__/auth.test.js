import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterEach, beforeEach, describe } from '@jest/globals';
import app from '../src/app.js';
import User from '../src/db/User.js';

dotenv.config();

const { DB_TEST_URL } = process.env;

beforeEach(async () => {
  await mongoose.connect(DB_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
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

    it('should find a user with same email and throw error', async () => {
      try {
        const user = new User({
          password: 'pass123',
          username: 'Jeff',
          email: 'jeff@jeff.com',
        });

        await user.save();
        const response = await supertest(app)
          .post('/auth/register')
          .send({
            password: 'pass123',
            username: 'Jeff',
            email: 'jeff@jeff.com',
          })
          .expect(400);
        expect(response.body.message).toBe('Email is already in use!!');
      } catch (error) {
        console.log(error);
      }
    });
  });
});

describe('/auth/login', () => {
  describe('POST', () => {
    it('should find a user with given credentials', async () => {
      try {
        await supertest(app)
          .post('/auth/register')
          .send({
            password: 'pass123',
            username: 'Jeff',
            email: 'jeff@jeff.com',
          })
          .expect(200);

        const response = await supertest(app)
          .post('/auth/login')
          .send({
            password: 'pass123',
            email: 'jeff@jeff.com',
          })
          .expect(200);
        expect(response.body.message).toBe('login successful');
      } catch (error) {
        console.log(error);
      }
    });

    it('should throw error because password not match', async () => {
      try {
        await supertest(app)
          .post('/auth/register')
          .send({
            password: 'pass12',
            username: 'Jeff',
            email: 'jeff@jeff.com',
          })
          .expect(200);

        const response = await supertest(app)
          .post('/auth/login')
          .send({
            password: 'pass123',
            email: 'jeff@jeff.com',
          })
          .expect(401);
        expect(response.body.message).toBe('Wrong email or password');
      } catch (error) {
        console.log(error);
      }
    });
  });
});
