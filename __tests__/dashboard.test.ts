import supertest from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { afterEach, beforeEach } from '@jest/globals';
import app from '../src/app';
import User from '../src/db/User';

dotenv.config();

const { DB_TEST_URL = ' ' } = process.env;

beforeEach(async () => {
  await mongoose.connect(DB_TEST_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
  });
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('/dashboard', () => {
  describe('GET', () => {
    it('should search user with credentials included in jwt and cant find any user', async () => {
      try {
        const response = await supertest(app)
          .get('/dashboard')
          .set('Cookie', [
            'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplZmZAbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3MxMjMiLCJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxODE2MjM5MDIyfQ.4qtHsXaNpdum22VlS1Y0OOKPD0tWbKpROhGrl7S08Pc',
          ])
          .expect(404);

        expect(response.body.message).toBeTruthy();
        expect(response.body.message).toBe('User not found');
      } catch (error) {
        console.log(error);
      }
    });

    it('should not find jwt and return error', async () => {
      try {
        const response = await supertest(app).get('/dashboard').expect(403);

        expect(response.body.message).toBeTruthy();
        expect(response.body.message).toBe('You must provide valid auth token');
      } catch (error) {
        console.log(error);
      }
    });

    it('should search user with credentials included in jwt and match user', async () => {
      try {
        await User.insertMany({
          password: 'pass123',
          username: 'John Doe',
          email: 'jeff@mail.com',
        });
        await supertest(app)
          .get('/dashboard')
          .set('Cookie', [
            'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplZmZAbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3MxMjMiLCJ1c2VybmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxODE2MjM5MDIyfQ.4qtHsXaNpdum22VlS1Y0OOKPD0tWbKpROhGrl7S08Pc',
          ])
          .expect(404);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
