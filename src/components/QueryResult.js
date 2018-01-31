import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import './QueryResult.css';
import loadingGif from '../loading.gif';

export default class QueryResult extends Component {
  state = {
    viewKey: 1,
  };

  handleViewSelect = (viewKey) => {
    this.setState({ viewKey });
  };

  render() {
    const { value, loading } = this.props;

    if (loading) {
      return (
        <div className="QueryResult">
          <img className="loadingIndicator" src={loadingGif} alt="loading" />
        </div>
      );
    }

    return (
      <div className="QueryResult">
        <CodeMirror
          value={value}
          options={{
            mode: { name: 'javascript', json: true },
            readOnly: 'nocursor',
          }}
          onChange={() => {}}
        />
        <Nav bsStyle="pills" activeKey={this.state.viewKey} onSelect={this.handleViewSelect}>
          <NavItem eventKey={1}>
            JSON
          </NavItem>
          <NavItem eventKey={2}>
            Table
          </NavItem>
        </Nav>
      </div>
    );
  }
}
