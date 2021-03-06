import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./book";
import PropTypes from "prop-types";

export default class Search extends Component {
  static propTypes = {
    library: PropTypes.array.isRequired,
  };

  state = {
    text: "",
    resultBooks: [],
    filteredLibrary: [],
  };

  handleChange = (event) => {
    this.setState(
      {
        text: event.target.value,
      },
      () => {
        // console.log(this.state.text);
        if (this.state.text.length > 0) {
          this.updateSearchBooks(this.state.text);
        }
      }
    );
  };

  updateSearchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState(
        {
          resultBooks: books,
        },
        () => {
          console.log("NEW SEARCH");

          this.setState({
            filteredLibrary: this.props.library.filter((book) => {
              if (book.title.toLowerCase().includes(query.toLowerCase())) {
                console.log(book);
                return book;
              } else {
                return null;
              }
            }),
          });
        }
      );
    });
  };

  //update

  //add

  render() {
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
              onChange={this.handleChange}
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
                  //   onChange={(event) =>
                  //     this.moveHandler(event.target.value, book)
                  //   }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
