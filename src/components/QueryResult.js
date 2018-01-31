import React, { Component } from 'react';
import { Nav, NavItem, Tab } from 'react-bootstrap';
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
      <Tab.Container id="result-view-type" defaultActiveKey="json" className="QueryResult">
        <div >
          <Tab.Content animation>
            <Tab.Pane eventKey="json">
              <CodeMirror
                value={value}
                options={{
                  mode: { name: 'javascript', json: true },
                  readOnly: 'nocursor',
                }}
                onChange={() => {}}
              />
            </Tab.Pane>
            <Tab.Pane eventKey="table">
              Table!
            </Tab.Pane>
          </Tab.Content>
          <Nav bsStyle="pills">
            <NavItem eventKey="json">
              JSON
            </NavItem>
            <NavItem eventKey="table">
              Table
            </NavItem>
          </Nav>
        </div>
      </Tab.Container>
    );
  }
}
