import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./book";
import PropTypes from "prop-types";

export default class Search extends Component {
  static propTypes = {
    library: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    text: "",
    resultBooks: [],
  };

  handleTextChange = (event) => {
    this.setState(
      {
        text: event.target.value,
      },
      () => {
        if (this.state.text.length > 0) {
          this.updateSearchBooks(this.state.text);
        }
      }
    );
  };

  updateSearchBooks = (query) => {
    //filter Original Library !!BONUS FEATURE!!
    // this.setState({
    //   filteredLibrary: this.props.library.filter((book) => {
    //     if (book.title.toLowerCase().includes(query.toLowerCase())) {
    //       return book;
    //     } else {
    //       return null;
    //     }
    //   }),
    // });

    //get search from API
    BooksAPI.search(query).then((books) => {
      if (books.error !== "empty query") {
        this.setState({
          resultBooks: books,
        });
      } else {
        this.setState({
          resultBooks: [],
        });
      }
    });
  };

  render() {
    const moveHandler = this.props.onChange;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" type="button">
              Close
            </button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {// breaks when result is 0
            this.state.resultBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelfed={false}
                  onChange={(event) => moveHandler(event.target.value, book)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
