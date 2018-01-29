import React, { Component } from 'react';
import moment from 'moment';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import runJs from '../lib/runJs';

const initialJs = `
const fromDate = moment().subtract(7, 'days').toDate();
const toDate = new Date();

queryBuilder
  // .median('STARTUPTIME') TODO: Uncomment
  .between(fromDate, toDate)
  .query()
  .then(console.log);
`.trim();

export default class QueryEditor extends Component {
  state = {
    js: initialJs,
  }

  console = {
    log: (data) => this.props.onResult(JSON.stringify(data, null, 2)),
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
          value={this.state.js}
          options={{
            mode: 'javascript',
          }}
          onChange={this.updateJs}
          autoFocus
        />
        <button>Run</button>
      </form>
    )
  }
}
