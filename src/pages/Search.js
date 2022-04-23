import React, {Component} from "react";
import * as BooksAPI from "../BooksAPI";
import ListOfBooks from "../components/ListOfBooks";

class Search extends Component {

    state = {
        someBooks: [],
        query: "",
        showError: false
    }

    handleChange = (event) => {
        this.setState({query: event.target.value});

        BooksAPI.search(event.target.value).then(someBooks => {
            
            this.setState({showError: false})
            if(someBooks instanceof Array){
                
                someBooks.forEach(book => {
                    
                    const tempBook = this.props.mainBooks[book.id];
                    
                    if(typeof tempBook !== "undefined" ){
                        book["shelf"] = this.props.mainBooks[book.id].shelf;
                    }
                    else {
                        book["shelf"] = "none";
                    }     
                });
                
                this.setState({someBooks});
                
            }
            else {
                this.setState({someBooks: []});
                
            }
        }).catch(err => {
            this.setState({showError: true});
        })
    }

    render(){
        const {query, someBooks} = this.state;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                <button className="close-search" onClick={() => this.props.history.push("/")}>Close</button>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" value={query} onChange={this.handleChange}/>

                </div>
                </div>
                {this.state.showError? <p style={{marginTop:"64px"}}>check connection</p>: <div className="search-books-results">
                    {someBooks.length === 0?  <p>No Results</p>: <ListOfBooks changeShelfOfBook={this.props.changeShelfOfBook} books={someBooks} />}
                </div>}
                
            </div>
        )
    }
}

export default Search