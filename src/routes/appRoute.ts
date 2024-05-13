import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { handleSingleUploadFile } from '../utils/uploadSingle';

const appRoute = Router();

appRoute.post('/upload', async (req, res) => {
  let uploadResult;
  try {
    uploadResult = await handleSingleUploadFile(req, res);
  } catch (e) {
    return res.status(422).json({ errors: e });
  }
  return res.json({ data: uploadResult });
});

appRoute.get('/view-file', async (req, res) => {
  const { file  } = req.query as { file: string; };
  try {
    const filePath = path.resolve(__dirname, '../../public/uploads', file);
    return res.sendFile(filePath);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

appRoute.delete('/delete-file', async (req, res) => {
  const { file } = req.query as { file: string; };
  try {
    const filePath = path.resolve(__dirname, '../../public/uploads', file);
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
