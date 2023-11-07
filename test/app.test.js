const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('./../index');
const expect = chai.expect;
require('dotenv').config({ path: './.env' });

chai.use(chaiHttp);


const testDBUri = process.env.DB_URL;

before(async () => {
  await mongoose.connect(testDBUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
  await mongoose.connection.close();
});

describe('CRUD Operations for Books', () => {
  let bookId;

  it('should create a new book', async () => {
    const response = await chai
      .request(app)
      .post('/api/books')
      .send({ title: 'Sample Book', author: 'Sample Author', summary: 'Sample Summary' });

    expect(response).to.have.status(201);
    expect(response.body.title).to.equal('Sample Book');
    expect(response.body.author).to.equal('Sample Author');
    expect(response.body.summary).to.equal('Sample Summary');
    bookId = response.body._id;
  });

  it('should get a list of all books', async () => {
    const response = await chai.request(app).get('/api/books');
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
  });

  it('should get details of a specific book by its ID', async () => {
    const response = await chai.request(app).get(`/api/books/${bookId}`);
    expect(response).to.have.status(200);
    expect(response.body.title).to.equal('Sample Book');
    expect(response.body.author).to.equal('Sample Author');
    expect(response.body.summary).to.equal('Sample Summary');
  });

  it('should update a book\'s details by its ID', async () => {
    const response = await chai
      .request(app)
      .put(`/api/books/${bookId}`)
      .send({ title: 'Updated Book Title' });

    expect(response).to.have.status(200);
    expect(response.body.title).to.equal('Updated Book Title');
  });

  it('should delete a book by its ID', async () => {
    const response = await chai.request(app).delete(`/api/books/${bookId}`);
    expect(response).to.have.status(200);

    // Ensure the book is deleted
    const getDeletedBook = await chai.request(app).get(`/api/books/${bookId}`);
    expect(getDeletedBook).to.have.status(404);
  });
});