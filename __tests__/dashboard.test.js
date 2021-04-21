import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterEach, beforeEach } from '@jest/globals';
import app from '../src/app.js';
import User from '../src/db/User.js';

dotenv.config();

const { DB_TEST_URL } = process.env;

describe('/dashboard', () => {
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

  test('GET', async () => {
    try {
      const response = await supertest(app)
        .get('/dashboard')
        .set('Cookie', [
          'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InBhc3MxMjMiLCJ1c2VybmFtZSI6IkplZmYiLCJlbWFpbCI6ImplZmZAamVmZi5jb20iLCJpYXQiOjE3MTYyMzkwMjJ9.0FEvfhXmrc3Ol7wFSoSd5sRIVc7_TXWI4gkRGJapkCw',
        ])
        .expect(404);

      expect(Array.isArray(response.body)).toBeFalsy();
      expect(response.body.message).toBeTruthy();
      expect(response.body.message).toBe('User not found');
    } catch (error) {
      console.log(error);
    }
  });
});
