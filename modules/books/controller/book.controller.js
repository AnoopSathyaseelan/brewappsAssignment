const Book = require('./../models/books.schema');

module.exports = {
    addNewBooks: async (req, res) => {
        try {
            const { title, author, summary } = req.body;
            const book = new Book({ title, author, summary });
            await book.save();
            return res.status(201).json(book);
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.title) {
                return res.status(400).json({ error: 'Book with this title already exists' });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    },
    getAllBooks: async (req, res) => {
        try {
            const books = await Book.find();
            if (books.length === 0) return res.json({ message: "No books found" })
            return res.json(books);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getParticularBook: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            return res.json(book);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    updateBookDetails: async (req, res) => {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            return res.json(book);
        } catch (error) {
            if (error.name === 'MongoServerError' && error.code === 11000 && error.codeName==='DuplicateKey') {
                return res.status(400).json({ error: 'Book with this title already exists' });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
        
    },
    deleteBookById: async (req, res) => {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            return res.json({ message: 'Book deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}