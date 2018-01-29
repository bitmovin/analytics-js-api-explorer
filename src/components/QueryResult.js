import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

export default function QueryResult({ value }) {
  return (
    <CodeMirror
      className="QueryResult"
      value={value || 'xxx'}
      options={{
        mode: { name: 'javascript', json: true },
        readOnly: true,
      }}
      onChange={() => {}}
    />
  );
}
