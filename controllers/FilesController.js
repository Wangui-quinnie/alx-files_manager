// controllers/FilesController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');

exports.postUpload = async function postUpload(req, res) {
  const {
    name, type, data, parentId = '0', isPublic = false,
  } = req.body;
  const { userId } = req;

  // Check if name is missing
  if (!name) {
    return res.status(400).json({ error: 'Missing name' });
  }

  // Check if type is missing or not valid
  if (!type || !['folder', 'file', 'image'].includes(type)) {
    return res.status(400).json({ error: 'Missing or invalid type' });
  }

  // Check if data is missing for non-folder type
  if (type !== 'folder' && !data) {
    return res.status(400).json({ error: 'Missing data' });
  }

  // Check if parentId is set
  if (parentId !== '0') {
    // Check if file is present in DB for this parentId
    const parentFile = await dbClient.getFileById(parentId);
    if (!parentFile) {
      return res.status(400).json({ error: 'Parent not found' });
    }
    // Check if the file present in DB for this parentId is not of type folder
    if (parentFile.type !== 'folder') {
      return res.status(400).json({ error: 'Parent is not a folder' });
    }
  }

  // Prepare file object to be saved in DB
  const fileObj = {
    userId: ObjectId(userId),
    name,
    type,
    parentId: ObjectId(parentId),
    isPublic,
  };

  // Handle file data for non-folder types
  if (type !== 'folder') {
    // Decode Base64 data and save to disk
    const filePath = path.join(process.env.FOLDER_PATH || '/tmp/files_manager', `${uuidv4()}`);
    const fileBuffer = Buffer.from(data, 'base64');
    fs.writeFileSync(filePath, fileBuffer);
    fileObj.localPath = filePath;
  }

  // Save file object to DB
  const newFile = await dbClient.createFile(fileObj);

  // Return the new file object
  return res.status(201).json(newFile);
};
