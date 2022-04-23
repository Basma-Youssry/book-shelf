import React, {Component} from "react"

class ListOfBooks extends Component {
    state= {
        selectedBook: "none"
    }

    render(){
        const {books} = this.props;
        return (
            <ol className="books-grid">
                {books.map(book => {
                    const bookImage = book.imageLinks;
                    return (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: typeof bookImage !== "undefined"? `url(${bookImage.smallThumbnail})`: '' }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={book.shelf} onChange={(e) => this.props.changeShelfOfBook(book, e.target.value)}>
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{typeof book.authors !== "undefined"? book.authors[0]: ""}</div>
                            </div>
                        </li>
                    )
                })}
          </ol>
        )
    }
}

export default ListOfBooks