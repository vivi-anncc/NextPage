# Project Goal

The goal of this project is to learn and practice full-stack web development by building a book management and recommendation application using JavaScript, React, Node.js, Express, and PostgreSQL.

## Features

* Add books to your personal collection
* View saved books
* Edit existing books
* Delete books
* Perform CRUD operations
* Search for book recommendations
* Filter recommendations by genre
* Search recommendations by author

## Technologies Used

### Frontend

* React
* JavaScript
* CSS
* HTML

### Backend

* Node.js
* Express
* PostgreSQL
* `pg` PostgreSQL client
* `dotenv`


## Database

The application uses PostgreSQL.

There are two main tables.

### Books

The `books` table stores books in the user's personal collection.

```text
id
title
author
genre
```

### Recommendations

The `recommendations` table stores books that can be returned by the recommendation system.

```text
id
title
author
genre
```

## Recommendation System

The recommendation system allows the user to search using:

* Genre only
* Author only
* Genre and author together

The backend uses PostgreSQL queries to find matching books and randomly orders the results before returning them.


## Installation

Clone the project and install the dependencies:

```bash
npm install
```

Make sure PostgreSQL is installed and running.

Create your database and tables.

Then start the backend:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:3000
```

Start the React development server using the appropriate command for your project, for example:

```bash
npm run dev
```

## Usage

### My Books

The My Books page allows users to enter:

* Book title
* Author
* Genre

Users can then add the book to their collection.

Existing books can be edited or deleted.

### Recommendations

The Recommendations page allows users to select a genre and/or enter an author.

After clicking **Get Recommendation**, the application searches the recommendation database and displays a matching book.

If there are no matching books, the application displays a message letting the user know that no matches were found.


The design uses a simple book-focused aesthetic with serif headings, warm neutral colors, and subtle animations.

## Future Improvements

Possible future features include:
* Accounts and user sign-ins
* Mood-based recommendations
* More recommendation categories
* Book cover images
* Ratings and reviews
* Favorite books
* Search and sorting

