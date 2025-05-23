import express from 'express';
import { addBook, getBooks, getBookById, searchBooks } from '../controllers/bookController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.post('/', protect, addBook);

export default router;