import React, { Component } from 'react';
import runJs from './runJs';
import moment from 'moment';

class App extends Component {
  state = {
    js: '',
  };

  updateJs = ({ target }) => {
    this.setState({ js: target.value });
  };

  runJs = (event) => {
    event.preventDefault();

    runJs(this.state.js, { moment });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.runJs}>
          <input
            onChange={this.updateJs}
            value={this.state.js}
          />
          <button>Run</button>
        </form>
      </div>
    );
  }
}

export default App;
