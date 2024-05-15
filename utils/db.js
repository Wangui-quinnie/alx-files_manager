// utils/db.js
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url);
    this.client.connect((err) => {
      if (err) {
        console.error('DB connection error:', err);
      } else {
        console.log('DB connected successfully');
      }
    });
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    if (!this.isAlive()) {
      throw new Error('DB connection is not alive');
    }
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    if (!this.isAlive()) {
      throw new Error('DB connection is not alive');
    }
    const db = this.client.db();
    const filesCollection = db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }

  async getUserByEmail(email) {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    return user;
  }

  async createUser(email, password) {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const newUser = await usersCollection.insertOne({ email, password });
    return { id: newUser.insertedId, email };
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
