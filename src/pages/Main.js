import React, {Component} from "react"
import ListOfBooks from "../components/ListOfBooks"
import * as BooksAPI from "../BooksAPI"

class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
        bookShelves: {
          "currentlyReading": [],
          "wantToRead": [],
          "read": [] 
        },
        isFetched: false,
        showError: false
      }
    }

    componentDidUpdate(prevProps){
      
      if(prevProps.selectedBookAndItsShelf !== this.props.selectedBookAndItsShelf){
        
        const {selectedBook, shelf} = this.props.selectedBookAndItsShelf;
        console.log(selectedBook, shelf);

        if(selectedBook.shelf !== shelf){

          if(shelf === "none"){

            const listOfBooksWithoutSelectedBook = this.state.bookShelves[selectedBook.shelf].filter(book => {
              return book.id !== selectedBook.id
            });

            this.setState({bookShelves: {...this.state.bookShelves, [selectedBook.shelf]: listOfBooksWithoutSelectedBook, 
            }})

            return;
          }

          if(selectedBook.shelf !== "none"){

            const listOfBooksWithoutSelectedBook = this.state.bookShelves[selectedBook.shelf].filter(book => {
              return book.id !== selectedBook.id
            });
            const tempShelf = selectedBook.shelf;
            selectedBook.shelf = shelf;

            const listOfBooksWithSelectedBook = this.state.bookShelves[shelf];
            listOfBooksWithSelectedBook.push(selectedBook);
            
            this.setState({bookShelves: {...this.state.bookShelves ,[tempShelf]: listOfBooksWithoutSelectedBook, 
              [shelf]: listOfBooksWithSelectedBook
            }});

          }
        }
      }
    }

    componentDidMount(){
      
      BooksAPI.getAll().then(books => {
        const currentlyReadingBooks = [];
        const wantToReadBooks = [];
        const readBooks = [];
       
        books.forEach(book => {
          switch (book.shelf) {
            case "currentlyReading":
              currentlyReadingBooks.push(book);
              break;
            case "wantToRead":
              wantToReadBooks.push(book);
              break;
            default:
              readBooks.push(book);
              break;
          }
        });

        this.setState({
          bookShelves: {
            "currentlyReading": currentlyReadingBooks,
            "wantToRead": wantToReadBooks,
            "read": readBooks 
          },
          showError: false
        });

        this.props.mainSendBookSToSearch(currentlyReadingBooks, wantToReadBooks, readBooks);

      }).catch(error => {
        this.setState({showError: true})
      })
    }
  
    render(){

        return (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            {this.state.showError? <p>check connection</p>: <>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                    <ListOfBooks changeShelfOfBook={this.props.changeShelfOfBook}  books= {this.state.bookShelves["currentlyReading"]}/>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                    <ListOfBooks changeShelfOfBook={this.props.changeShelfOfBook} books= {this.state.bookShelves["wantToRead"]}/>
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ListOfBooks changeShelfOfBook={this.props.changeShelfOfBook} books= {this.state.bookShelves["read"]}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.props.history.push("/search")}>Add a book</button>
              </div>
            </>
            }
          </div>
        )
    }

}

export default Main