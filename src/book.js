import React from "react";
export default function Book(props) {
  return (
    <div className="book">
      {/* <div>{console.log(book)}</div> */}
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book.imageLinks.thumbnail})`,
          }}
        />

        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={props.onChange}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      {/* fix later for all authors */}
      <div className="book-authors">{props.book.authors[0]}</div>
    </div>
  );
}
