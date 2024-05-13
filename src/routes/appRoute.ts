import { Router } from 'express';
import * as path from 'path';
import fs from 'fs';
import { handleSingleUploadFile } from '../utils/uploadSingle';

const appRoute = Router();

const getFirstAndLastPart = (str) => {
  const lastSlashIndex = str.lastIndexOf('/');
  const firstPart = str.substring(0, lastSlashIndex);
  const lastPart = str.substring(lastSlashIndex + 1);
  return [firstPart, lastPart];
};

appRoute.post('/files-manager/upload', async (req, res) => {
  let uploadResult;
  try {
    uploadResult = await handleSingleUploadFile(req, res);
  } catch (e) {
    return res.status(422).json({ errors: e });
  }
  return res.json({ data: uploadResult });
});

appRoute.get('/files-manager/view-file', async (req, res) => {
  const { file, folder } = req.query as { file: string; folder: string;  };
  const result = getFirstAndLastPart(file);
  try {
    const filePath = path.join(__dirname, '../../public', result[0], result[1]);
    return res.sendFile(filePath);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

appRoute.delete('/files-manager/delete-file', async (req, res) => {
  const { file } = req.query as { file: string;  };
  const result = getFirstAndLastPart(file);
  try {
    const filePath = path.join(__dirname, '../../public', result[0], result[1]);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ message: 'File deleted successfully' });
    } else {
      return res.status(404).json({ message: 'File not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error', error: err });
  }
});

export { appRoute };
