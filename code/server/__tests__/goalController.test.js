const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');  // Import the app, not the server instance
const Goal = require('../models/Goal');
const { MongoMemoryServer } = require('mongodb-memory-server');
let mongoServer;
let server;

beforeAll(async () => {
  process.env.NODE_ENV = 'test';  // Set NODE_ENV to test
  
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  console.log('mongoose uri:', uri);
  server = app.listen(5001);  // Start the test server
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  if (server) server.close();
});

describe('Goal Controller Endpoints', () => {
  beforeEach(async () => {
    // Clear all goals before each test
    await Goal.deleteMany({});
  });

  // Test for successful goal creation
  it('should create a new goal successfully', async () => {
    const res = await request(app)
      .post('/api/goals/create-goal')
      .send({ type: 'sleep', targetValue: 8 });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toBe('New goal created successfully');
    expect(res.body.goalId).toBeDefined();  // Check that goalId is returned

    // Verify the goal is created in the database
    const goal = await Goal.findOne({ goalId: res.body.goalId });
    expect(goal).toBeDefined();
    expect(goal.type).toBe('sleep');
    expect(goal.targetValue).toBe(8);
    expect(goal.unit).toBe('hours');  // 'sleep' should have 'hours' as unit
  });

  // Test for different goal types
  it('should create a new goal with the correct unit for type "water"', async () => {
    const res = await request(app)
      .post('/api/goals/create-goal')
      .send({ type: 'water', targetValue: 10 });

    expect(res.statusCode).toEqual(201);
    expect(res.body.goalId).toBeDefined();  // Check that goalId is returned

    // Verify the goal is created with correct unit
    const goal = await Goal.findOne({ goalId: res.body.goalId });
    expect(goal.unit).toBe('glasses');  // 'water' should have 'glasses' as unit
  });

  // Test for missing fields (type or targetValue)
  it('should return 500 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/goals/create-goal')
      .send({ type: '' });  // Missing targetValue and empty type

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBe('Failed to create goal');
  });

  // Test for unknown goal type
  it('should create a goal with "unknown" unit for unknown type', async () => {
    const res = await request(app)
      .post('/api/goals/create-goal')
      .send({ type: 'unknownType', targetValue: 5 });

    expect(res.statusCode).toEqual(201);
    expect(res.body.goalId).toBeDefined();  // Check that goalId is returned

    // Verify the goal is created with "unknown" unit
    const goal = await Goal.findOne({ goalId: res.body.goalId });
    expect(goal.unit).toBe('unknown');  // Unrecognized type should have "unknown" as unit
  });

  // Test for database error simulation
  it('should return 500 if a database error occurs', async () => {
    // Mock the save function to throw an error
    jest.spyOn(Goal.prototype, 'save').mockImplementationOnce(() => {
      throw new Error('Database Error');
    });

    const res = await request(app)
      .post('/api/goals/create-goal')
      .send({ type: 'steps', targetValue: 10000 });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toBe('Failed to create goal');
  });
});
