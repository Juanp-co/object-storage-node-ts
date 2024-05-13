import * as path from 'path';
import { Request, Response } from 'express';
import fs from 'fs';

const handleSingleUploadFile = async (req: Request, res: Response): Promise<any> => {
  
  return new Promise(async (resolve, reject) => {
    const base64Data = req.body.base64Data;
    const buffer = Buffer.from(base64Data, 'base64');
    const filePath = path.join(__dirname, '../../public', req.body.folderName);
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    try {
      await fs.promises.writeFile(`${filePath}/${req.body.fileName}`, buffer );
      resolve({ file: 'req.file '});
    } catch (error) {
      reject(error);
    }
  });
};

export { handleSingleUploadFile };
