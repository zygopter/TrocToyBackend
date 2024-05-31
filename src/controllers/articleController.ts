// src/controllers/articleController.ts
import { Request, Response } from 'express';
import Article from '../models/articleModel';
import multer from 'multer';
import path from 'path';
import upload from '../config/multerConfig';


// Middleware pour gérer les téléchargements de photos
export const handleUploads = upload.array('photos', 5);

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  const { title, description, userId, location } = req.body;
  const photos = (req.files as Express.Multer.File[])?.map((file) => file.path);

  const article = new Article({ title, description, userId, location, photos });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
