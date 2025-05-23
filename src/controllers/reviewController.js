import Review from '../models/Review.js';
import Book from '../models/Book.js';

export const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;

  const existing = await Review.findOne({ user: req.user._id, book: bookId });
  if (existing) return res.status(400).json({ message: 'Review already exists' });

  const review = await Review.create({ user: req.user._id, book: bookId, rating, comment });
  await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (String(review.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating review' });
  }
};



export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (String(review.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const bookId = review.book;

    await review.deleteOne();

    if (bookId) {
      await Book.findByIdAndUpdate(bookId, {
        $pull: { reviews: review._id },
      });
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error); 
    res.status(500).json({ message: 'Server error while deleting review' });
  }
};

