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
  .median('STARTUPTIME')
  .between(fromDate, toDate)
  .filter('STARTUPTIME', 'GT', 0)
  .query()
`.trim();

export default class QueryEditor extends Component {
  state = {
    js: initialJs,
    error: null,
  };

  updateJs = (editor, data, js) => {
    this.setState({ js });
  };

  runJs = async (event) => {
    const { queryBuilder, onResult, onRun, onRunEnd, onError } = this.props;
    onRun();

    try {
      const result = await runJs(this.state.js, { moment, queryBuilder });
      onResult(JSON.stringify(result, null, 2));
    } catch (error) {
      onError(error.toString());
    }

    onRunEnd();
  };

  handleClick = (event) => {
    event.preventDefault();
    this.runJs();
  }

  componentDidMount() {
    this.runJs();

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
          </ul>
          <p>
            The explorer outputs the value of the last statement. If it's a promise,
            like when you call <code>.query()</code>, the promise is resolved.
          </p>
        </div>
      </div>
    )
  }
}
