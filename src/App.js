import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./book";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    library: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({ library: books }));
      this.setState(() => ({
        currentlyReading: this.state.library.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantToRead: this.state.library.filter(
          (book) => book.shelf === "wantToRead"
        ),
        read: this.state.library.filter((book) => book.shelf === "read"),
      }));
    });
  }

  moveHandler = (event, book) => {
    BooksAPI.update(book, event.target.value);
    console.log(event);
  };

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
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
                      {this.state.currentlyReading.map((book) => (
                        <li key={book.id}>
                          <Book book={book} moveHandler={this.moveHandler} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead.map((book) => (
                        <li key={book.id}>
                          <Book book={book} moveHandler={this.moveHandler} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read.map((book) => (
                        <li key={book.id}>
                          <Book book={book} moveHandler={this.moveHandler} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* end of content */}
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
