import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./book";
import { Route, Link } from "react-router-dom";
import Search from "./search";

class BooksApp extends Component {
  state = {
    library: [],
  };

  initializeStates = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        library: books.filter((book) => book.shelf !== "none"),
      }));
    });
  };

  componentDidMount() {
    this.initializeStates();
  }

  moveHandler = (newShelf, book) => {
    BooksAPI.update(book, newShelf).then(() => {
      this.initializeStates();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search library={this.state.library} onChange={this.moveHandler} />
          )}
        />
        <Route
          exact
          path="/"
          render={(history) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>

              {/* content */}
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.library
                          .filter((book) => book.shelf === "currentlyReading")
                          .map((book) => (
                            <li key={book.id}>
                              <Book
                                book={book}
                                onChange={(event) =>
                                  this.moveHandler(event.target.value, book)
                                }
                              />
                            </li>
                          ))}
                      </ol>
                    </div>
                  </div>

                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.library
                          .filter((book) => book.shelf === "wantToRead")
                          .map((book) => (
                            <li key={book.id}>
                              <Book
                                book={book}
                                onChange={(event) =>
                                  this.moveHandler(event.target.value, book)
                                }
                              />
                            </li>
                          ))}
                      </ol>
                    </div>
                  </div>

                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.library
                          .filter((book) => book.shelf === "read")
                          .map((book) => (
                            <li key={book.id}>
                              <Book
                                book={book}
                                onChange={(event) =>
                                  this.moveHandler(event.target.value, book)
                                }
                              />
                            </li>
                          ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* end of content */}
              <Link to="/search" className="open-search">
                <button type="button">Add a book</button>
              </Link>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
