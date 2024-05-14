import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { appRoute } from './routes/appRoute';

dotenv.config();

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');
function NotFound404Controller(req, res) {
  return res.status(404).json({
    err: "Not found!"
  });
}
const _404Router = express.Router();
_404Router
  .route('/*')
  .delete(NotFound404Controller)
  .get(NotFound404Controller)
  .post(NotFound404Controller)
  .put(NotFound404Controller);

const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(express.static('public'));
// app.use('/*', _404Router);
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World!' });
});

app.use('/', appRoute);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, async () => {
  console.log(`Application started on URL ${HOST}:${PORT} 🎉`);
});
