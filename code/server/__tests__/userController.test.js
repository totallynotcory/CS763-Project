// __tests__/userController.test.js
const request = require('supertest');
const app = require('../server');  
const mongoose = require('mongoose');
const User = require('../models/User');  // Your User model
const jwt = require('jsonwebtoken');

// Mock the database connection before running the tests
beforeAll(async () => {
  const url = 'mongodb://127.0.0.1:27017/testDB';
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Close the database connection after the tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Controller Endpoints', () => {
  
  // Test the createUser endpoint
  describe('POST /api/users/create-user', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users/create-user')
        .send({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toBe('User created successfully!');
      
      // Clean up the created user after the test
      await User.findOneAndDelete({ email: 'testuser@example.com' });
    });

    it('should return 400 if the user already exists', async () => {
      // First, create a user
      await User.create({
        userId: 1,
        name: 'Existing User',
        email: 'existinguser@example.com',
        passwordHashed: await bcrypt.hash('password123', 10),
      });

      const res = await request(app)
        .post('/api/users/create-user')
        .send({
          name: 'Existing User',
          email: 'existinguser@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('An account with this email already exists');

      // Clean up the created user after the test
      await User.findOneAndDelete({ email: 'existinguser@example.com' });
    });
  });

  // Test the loginUser endpoint
  describe('POST /api/users/login', () => {
    it('should log in a user and return a token', async () => {
      // First, create a user to log in
      const user = await User.create({
        userId: 1,
        name: 'Test User',
        email: 'testlogin@example.com',
        passwordHashed: await bcrypt.hash('password123', 10),
      });

      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'testlogin@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.message).toBe('Login successful');

      // Clean up the created user after the test
      await User.findOneAndDelete({ email: 'testlogin@example.com' });
    });

    it('should return 401 if the email or password is incorrect', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toBe('Invalid email or password.');
    });
  });

  // Test the viewUsers endpoint
  describe('GET /api/users/view-users', () => {
    it('should return a list of all users', async () => {
      const res = await request(app).get('/api/users/view-users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});