// src/routes/articleRoutes.ts
import { Router } from 'express';
import { getArticles, createArticle, deleteArticle, getArticleById, handleUploads } from '../controllers/articleController';
import upload from '../config/multerConfig';

const router = Router();

router.get('/', getArticles);
//router.post('/', createArticle);
router.post('/', handleUploads, createArticle);
router.delete('/:id', deleteArticle);
router.get('/:id', getArticleById);

export default router;
