// src/app.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import articleRoutes from './routes/articleRoutes';

const app = express();

// Middleware pour analyser le JSON
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

export default app;
