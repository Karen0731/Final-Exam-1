import React from 'react';
import './App.css';
import Book from './Book';
import BookForm from './BookForm';

class App extends React.Component{

  constructor( props ){
    super( props );
    this.state = {
      apiUrl : "https://www.googleapis.com/books/v1/volumes?q=",
      errorMessage:""
    }
  }

  handleSearch=(event)=>{
    event.preventDefault();
    const bookName = event.target.bookName.value;

    const url = `${this.state.apiUrl}${bookName}`;

    const settings={
      method:'GET'
    };

    fetch(url,settings)
        .then(response=>{
          if(response.ok)
              return response.json();
          throw  new  Error(response.statusText);
        })
        .then(responseJSON=>{
          console.log(responseJSON);
        })
  };

  render(){
    return(
      <div>
        <form onClick={this.handleSearch}>
          <label htmlFor="book">
            Book:
          </label>
          <input type="text" name="bookName" id="bookName"/>
          <button type="submit">
            Search
          </button>
        </form>
      </div>
    )
  }

}

export default App;
