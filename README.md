# Assingment 07-11-2023

This project contains the assignment tasks.

## Installation

Install with npm

```bash
  npm i
```

## Deploy

To run this project run

```bash
  npm run start
```

## Test

To run all test cases on this project 

```bash
  npm run test
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`
`PORT`

## API Endpoints and Usage

| Endpoint            | Method | Description                       | Request Body (JSON)     |
|---------------------|--------|-----------------------------------|-------------------------|
| `/api/books`        | GET    | Get a list of all books           | N/A                     |
| `/api/books/:id`    | GET    | Get details of a specific book    | N/A                     |
| `/api/books`        | POST   | Create a new book                 | { "title": "", "author": "", "summary": "" } |
| `/api/books/:id`    | PUT    | Update a book's details by its ID | { "title": "", "author": "", "summary": "" } |
| `/api/books/:id`    | DELETE | Delete a book by its ID           | N/A                     |

## Assumptions
Basic nodejs Application that does crud operation


## Deployment and CI/CD with fl0

Base URL: https://brewappsassignment-dev-arjh.2.sg-1.fl0.io

This project is deployed to a free tier of the "fl0" service using a robust CI/CD approach directly from our GitHub repository. "fl0" provides a seamless and cost-effective platform for hosting and managing web applications, making it easier for you to access and interact with our application.


## Authors

- [@anoopsathyaseelan](https://github.com/AnoopSathyaseelan)
