import React, { Component } from 'react';
import Authenticated from './components/Authenticated';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <Authenticated>
          <Main>
          </Main>
        </Authenticated>
      </div>
    );
  }
}

export default App;
