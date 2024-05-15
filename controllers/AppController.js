// controllers/AppController.js
const { redisClient, dbClient } = require('../utils');

const AppController = {
  async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  },

  async getStats(req, res) {
    try {
      const nbUsers = await dbClient.nbUsers();
      const nbFiles = await dbClient.nbFiles();
      res.status(200).json({ users: nbUsers, files: nbFiles });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = AppController;
