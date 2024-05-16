// utils/db.js
const { MongoClient, ObjectId } = require('mongodb');

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

  async getUserByEmailAndPassword(email, password) {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email, password });
    return user;
  }

  async getUserById(userId) {
    const db = this.client.db();
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ _id: userId });
    return user;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async createFile(fileObj) {
    try {
      const result = await this.db.collection('files').insertOne(fileObj);
      return result.ops[0];
    } catch (error) {
      console.error('Error creating file in DB:', error);
      throw error;
    }
  }

  async getFileById(fileId) {
    const fileCollection = this.db.collection('files');
    const file = await fileCollection.findOne({ _id: new ObjectId(fileId) });
    return file;
  }

  // Method to get all files by user ID and parent ID with pagination
  async getFilesByUserIdAndParentId(userId, parentId, page = 0) {
    const limit = 20; // Number of items per page
    const skip = page * limit; // Calculate the number of documents to skip based on the page

    const fileCollection = this.db.collection('files');
    const query = { userId: new ObjectId(userId) };

    if (parentId) {
      query.parentId = new ObjectId(parentId);
    } else {
      query.parentId = null; // Handle root folder where parentId is null
    }

    const files = await fileCollection.find(query).skip(skip).limit(limit).toArray();
    return files;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
