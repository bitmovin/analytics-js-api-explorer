import React, { Component } from 'react';
import { Nav, NavItem, Tab } from 'react-bootstrap';
import './QueryResult.css';
import JsonResult from './JsonResult';
import TableResult from './TableResult';

export default class QueryResult extends Component {
  state = {
    viewKey: 1,
  };

  handleViewSelect = (viewKey) => {
    this.setState({ viewKey });
  };

  render() {
    const { value, loading } = this.props;

    return (
      <Tab.Container id="result-view-type" defaultActiveKey="json" className="QueryResult">
        <div >
          <Tab.Content animation>
            <Tab.Pane eventKey="json">
              <JsonResult value={value} loading={loading} />
            </Tab.Pane>
            <Tab.Pane eventKey="table">
              <TableResult value={value} loading={loading} />
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
