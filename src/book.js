import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfChanger from "./shelfchanger";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveHandler: PropTypes.func.isRequired,
  };

  render() {
    const { book, moveHandler } = this.props;

    return (
      <div className="book">
        {/* <div>{console.log(book)}</div> */}
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          />

          <ShelfChanger book={book} onMove={moveHandler} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    );
  }
}

export default Book;
