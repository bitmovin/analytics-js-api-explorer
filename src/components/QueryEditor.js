import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
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

  updateJs = (editor, data, js) => {
    this.setState({ js });
  };

  runJs = (event) => {
    const { queryBuilder } = this.props;
    runJs(this.state.js, { moment, queryBuilder, console: this.console });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.runJs();
  }

  componentDidMount() {
    window.onkeyup = ({ altKey, key }) => {
      if (altKey && key === 'Enter') {
        this.runJs();
      }
    };
  }

  componentWillUnmount() {
    window.onkeyup = null;
  }

  render() {
    return (
      <form onSubmit={this.runJs} className="QueryEditor">
        <CodeMirror
          value={this.state.js}
          options={{
            mode: 'javascript',
            tabSize: 2,
          }}
          onBeforeChange={this.updateJs}
          autoFocus
        />
        <Button>Run <i>(Alt + Enter)</i></Button>
      </form>
    )
  }
}
