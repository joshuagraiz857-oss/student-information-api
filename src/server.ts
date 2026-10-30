import 'dotenv/config';
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';
import { pool } from './db.js';
const app = express();
const port = Number.parseInt(process.env.PORT ?? '3000', 10) || 3000;

app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Student Information API',
    course: 'ITE 303',
  });
});

app.use('/students', studentRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch((error: unknown) => {
    console.error('Database connection failed:', error);
  });
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
