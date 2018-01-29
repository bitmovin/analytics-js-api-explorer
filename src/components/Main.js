import React, { Component } from 'react';
import Bitmovin from 'bitmovin-javascript';
import moment from 'moment';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import LicenseKeySelect from './LicenseKeySelect.js';
import runJs from '../lib/runJs';
import './Main.css';

export default class Main extends Component {
  state = {
    queryBuilder: new Bitmovin({ apiKey: this.props.apiKey }).analytics.queries.builder,
    js: '',
  };

  updateJs = (js) => {
    this.setState({ js });
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
        <header>
          <h1>Bitmovin API Explorer</h1>
          {licenses.length > 1 && <LicenseKeySelect
            currentLicenseKey={currentLicenseKey}
            handleLicenseChange={this.handleLicenseChange}
            licenses={licenses}
          />}
        </header>
        <main>
          <form onSubmit={this.runJs}>
            <CodeMirror
              onChange={this.updateJs}
              value={this.state.js}
              autofocus
              mode='javascript'
            />
            <button>Run</button>
          </form>
          <pre>
            Result
          </pre>
        </main>
      </div>
    );
  }
}
