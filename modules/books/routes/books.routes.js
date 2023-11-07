const router = require('express').Router();
const { deleteBookById, updateBookDetails, getAllBooks, getParticularBook, addNewBooks } = require('../controller/book.controller')

router.post('/', addNewBooks);
router.get('/', getAllBooks);
router.get('/:id', getParticularBook);
router.put('/:id', updateBookDetails);
router.delete('/:id', deleteBookById);

module.exports = router