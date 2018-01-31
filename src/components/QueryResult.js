import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import './QueryResult.css';
import loadingGif from '../loading.gif';

export default function QueryResult({ value, loading }) {
  if (loading) {
    return (
      <div className="QueryResult">
        <img className="loadingIndicator" src={loadingGif} alt="loading" />
      </div>
    );
  }

  return (
    <CodeMirror
      className="QueryResult"
      value={value}
      options={{
        mode: { name: 'javascript', json: true },
        readOnly: 'nocursor',
      }}
      onChange={() => {}}
    />
  );
}
