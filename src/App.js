import React, { Component } from 'react';
import Authenticated from './components/Authenticated';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authenticated>
          <Main>
          </Main>
        </Authenticated>
      </div>
    );
  }
}

export default App;
