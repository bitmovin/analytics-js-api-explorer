import React, { Component } from 'react';
import Bitmovin from 'bitmovin-javascript';
import LicenseKeySelect from './LicenseKeySelect.js';
import QueryEditor from './QueryEditor.js';
import QueryResult from './QueryResult.js';
import './Main.css';

export default class Main extends Component {
  state = {
    queryResult: '',
    queryError: '',
  };

  handleQueryRun = () => this.setState({ queryResult: '', queryError: '' });
  handleQueryResult = (queryResult) => this.setState({ queryResult });
  handleQueryError = (queryError) => this.setState({ queryError });

  currentLicenseKey = () => {
    const currentLicenseKey = localStorage.getItem('licenseKey');
    const { licenses } = this.props;
    const { licenseKey } = licenses.find(l => l.licenseKey === currentLicenseKey) || licenses[0];

    if (licenseKey !== currentLicenseKey) {
      this.setLicenseKey(licenseKey);
    }

    return licenseKey;
  };

  setLicenseKey = (licenseKey) => {
    localStorage.setItem('licenseKey', licenseKey);
    this.forceUpdate();
  };

  handleLicenseChange = (event) => this.setLicenseKey(event.currentTarget.value);

  queryBuilder = () => {
    const client = new Bitmovin({ apiKey: this.props.apiKey });
    // TODO: Remove avg
    return client.analytics.queries.builder.avg('STARTUPTIME')
      .licenseKey(this.currentLicenseKey());
  };

  render() {
    const { licenses } = this.props;
    const { queryResult, queryError } = this.state;
    const currentLicenseKey = this.currentLicenseKey();

    return (
      <div className="Main">
        <header>
          <h1>Bitmovin API Explorer</h1>
          {licenses.length > 1 && <LicenseKeySelect
            currentLicenseKey={currentLicenseKey}
            handleLicenseChange={this.handleLicenseChange}
            licenses={licenses}
          />}
        </header>
        <main>
          <QueryEditor
            onResult={this.handleQueryResult}
            onError={this.handleQueryError}
            onRun={this.handleQueryRun}
            queryBuilder={this.queryBuilder()}
          />
          <QueryResult
            value={queryError || queryResult}
          />
        </main>
      </div>
    );
  }
}
