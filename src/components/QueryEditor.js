import React, { Component } from 'react';
import moment from 'moment';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import runJs from '../lib/runJs';

const initialJs = `
const fromDate = moment().subtract(7, 'days').toDate();
const toDate = new Date();

queryBuilder
  .median('STARTUPTIME')
  .between(fromDate, toDate)
  .query()
  .then(console.log);
`.trim();

export default class QueryEditor extends Component {
  state = {
    js: initialJs,
  }

  console = {
    log: (data) => this.props.onResult(JSON.stringify(data)),
  };

  updateJs = (js) => {
    this.setState({ js });
  };

  runJs = (event) => {
    event.preventDefault();

    const { queryBuilder } = this.props;

    runJs(this.state.js, { moment, queryBuilder, console: this.console });
  };

  render() {
    return (
      <form onSubmit={this.runJs} className="QueryEditor">
        <CodeMirror
          onChange={this.updateJs}
          value={this.state.js}
          autofocus
          mode='javascript'
        />
        <button>Run</button>
      </form>
    )
  }
}
