import React, { Component } from "react";
import PropTypes from "prop-types";

class ShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    // shelf: PropTypes.string.isRequired,
    onMove: PropTypes.func.isRequired,
  };

  render() {
    const { book, onMove } = this.props;

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={onMove}>
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger;
