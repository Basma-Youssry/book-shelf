import React from "react"
import { Route } from "react-router-dom"
// import * as BooksAPI from './BooksAPI'
import "./App.css"
import Main from "./pages/Main"
import Search from "./pages/Search"
import * as BooksAPI from "./BooksAPI"

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books:{},
    selectedBookAndItsShelf: {selectedBook: {}, shelf: "none"},
   
  }

  changeShelfOfBook = (selectedBook, shelf) => {
    
    BooksAPI.update(selectedBook, shelf)
    .then(res => console.log("res",res))
    .catch(err => console.log(err.message));
    
    this.setState({selectedBookAndItsShelf:{selectedBook, shelf}});

  }
  mainSendBookSToSearch = (currentlyReadingBooks, wantToReadBooks, readBooks) => {
    const tempBooks = {};
    currentlyReadingBooks.forEach(book => {
      tempBooks[book.id] = book;
    });
    wantToReadBooks.forEach(book => {
      tempBooks[book.id] = book;
    });
    readBooks.forEach(book => {
      tempBooks[book.id] = book;
    });
    this.setState({books: tempBooks})
  }

  render() {
    
    return (
      <div className="app">

        <Route exact path="/" render={({history}) => <Main selectedBookAndItsShelf={this.state.selectedBookAndItsShelf} changeShelfOfBook={this.changeShelfOfBook} mainSendBookSToSearch={this.mainSendBookSToSearch} history={history} />}/>
        <Route path="/search" render={({history}) => <Search changeShelfOfBook={this.changeShelfOfBook} mainBooks={this.state.books} history={history} />}/>

      </div>
    )
  }
}

export default BooksApp
