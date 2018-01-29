import React, { Component } from 'react';
import Bitmovin from 'bitmovin-javascript';
import { Panel } from 'react-bootstrap';
import moment from 'moment';
import LicenseKeySelect from './LicenseKeySelect.js';
import runJs from '../lib/runJs';

export default class Main extends Component {
  state = {
    queryBuilder: new Bitmovin({ apiKey: this.props.apiKey }).analytics.queries.builder,
    js: '',
  };

  updateJs = ({ target }) => {
    this.setState({ js: target.value });
  };

  runJs = (event) => {
    event.preventDefault();

    const { queryBuilder } = this.state;

    runJs(this.state.js, { moment, queryBuilder });
  }

  currentLicenseKey = () => {
    const currentLicenseKey = localStorage.getItem('licenseKey');
    const { licenses } = this.props;
    const { licenseKey } = licenses.find(l => l.licenseKey === currentLicenseKey) || licenses[0];

    if (licenseKey !== currentLicenseKey) {
      this.setLicenseKey(licenseKey);
    }

    return licenseKey;
  }

  setLicenseKey = (licenseKey) => {
    localStorage.setItem('licenseKey', licenseKey);
    this.forceUpdate();
  }

  handleLicenseChange = (event) => this.setLicenseKey(event.currentTarget.value)

  render() {
    const { licenses } = this.props;
    const { queryBuilder } = this.state;
    const currentLicenseKey = this.currentLicenseKey();

    return (
      <div className="Main">
        {licenses.length > 1 && <LicenseKeySelect
          currentLicenseKey={currentLicenseKey}
          handleLicenseChange={this.handleLicenseChange}
          licenses={licenses}
        />}
        <Panel>
          <form onSubmit={this.runJs}>
            <input
              onChange={this.updateJs}
              value={this.state.js}
            />
            <button>Run</button>
          </form>
        </Panel>
      </div>
    );
  }
}
