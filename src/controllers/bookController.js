import Book from '../models/Book.js';
import Review from '../models/Review.js';

export const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.error('Add book error:', error);
    res.status(400).json({ error: 'Add book failed' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const query = {};

    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'username',
        },
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ message: 'Server error while fetching books' });
  }
};


export const getBookById = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const book = await Book.findById(req.params.id)
      .populate({
        path: 'reviews',
        options: {
          skip: (page - 1) * limit,
          limit: Number(limit),
        },
        populate: {
          path: 'user',
          select: 'username',
        },
      });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    const avgRating = book.reviews.length
      ? (
          book.reviews.reduce((sum, review) => sum + review.rating, 0) /
          book.reviews.length
        ).toFixed(1)
      : null;

    res.json({ ...book.toObject(), averageRating: avgRating });
  } catch (error) {
    console.error('Get book by ID error:', error);
    res.status(500).json({ message: 'Server error while fetching book details' });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Query string required' });

    const regex = new RegExp(query, 'i');

    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }],
    }).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username',
      },
    });

    res.json(books);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error while searching books' });
  }
};

