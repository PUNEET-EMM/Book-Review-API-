import express from 'express';
import { addReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/books/:bookId/reviews', protect, addReview);         
router.put('/:reviewId', protect, updateReview);          
router.delete('/:reviewId', protect, deleteReview);       


export default router;