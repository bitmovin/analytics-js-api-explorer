import React, { Component } from 'react';
import { Nav, NavItem, Tab } from 'react-bootstrap';
import './QueryResult.css';
import JsonResult from './JsonResult';
import TableResult from './TableResult';

export default class QueryResult extends Component {
  state = {
    activeView: 'json',
    invalidJson: false,
  };

  handleViewSelect = (activeView) => {
    this.setState({ activeView });
  };

  componentWillReceiveProps({ value }) {
    try {
      JSON.parse(value);
      this.setState({ invalidJson: false });
    } catch (e) {
      this.setState({ invalidJson: true, activeView: 'json' });
    }
  }

  render() {
    const { activeView, invalidJson } = this.state;
    const { value, loading } = this.props;

    return (
      <Tab.Container
        id="result-view-type"
        activeKey={activeView}
        onSelect={this.handleViewSelect}
        className="QueryResult"
      >
        <div>
          <Tab.Content animation>
            <Tab.Pane eventKey="json">
              <JsonResult value={value} loading={loading} />
            </Tab.Pane>
            <Tab.Pane eventKey="table">
              {invalidJson ? '' : <TableResult value={value} loading={loading} />}
            </Tab.Pane>
          </Tab.Content>
          <Nav bsStyle="pills">
            <NavItem eventKey="json">
              JSON
            </NavItem>
            <NavItem eventKey="table" disabled={invalidJson}>
              Table
            </NavItem>
          </Nav>
        </div>
      </Tab.Container>
    );
  }
}
