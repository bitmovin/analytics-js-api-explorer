import React, { Component } from 'react';
import moment from 'moment';
import { Button, Glyphicon } from 'react-bootstrap';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import runJs from '../lib/runJs';
import './QueryEditor.css';

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
    error: null,
  }

  console = {
    log: (data) => this.props.onResult(JSON.stringify(data, null, 2)),
  };

  updateJs = (editor, data, js) => {
    this.setState({ js });
  };

  runJs = async (event) => {
    const { queryBuilder, onRun, onRunEnd, onError } = this.props;
    onRun();

    try {
      await runJs(this.state.js, { moment, queryBuilder, console: this.console });
    } catch (error) {
      this.props.onError(error.toString());
    }

    onRunEnd();
  };

  handleClick = (event) => {
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
    const { js } = this.state;
    return (
      <div className="QueryEditor">
        <form className="editor">
          <CodeMirror
            value={js}
            options={{
              mode: 'javascript',
              tabSize: 2,
            }}
            onBeforeChange={this.updateJs}
            autoFocus
          />
          <Button onClick={this.handleClick} className="runButton">
            <Glyphicon glyph="play" /> Run <i>(Alt + Enter)</i>
          </Button>
        </form>
        <div className="help">
          <p>The following objects are predefined in the editor:</p>

          <ul>
            <li>
              <code>moment</code> –
              The <a href="https://momentjs.com/">Moment.js</a> library.
            </li>
            <li>
              <code>queryBuilder</code> –
              Bitmovin Analytics query builder preconfigured for your account.
            </li>
            <li>
              <code>console</code> –
              Use console statements to print results. Only <code>console.log</code> is supported.
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
