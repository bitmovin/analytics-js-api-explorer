import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import LoadingIndicator from './LoadingIndicator';

export default function JsonResult({ value, loading }) {
  if (loading) {
    return <LoadingIndicator />
  }
  
  return (
    <CodeMirror
      value={value}
      options={{
        mode: { name: 'javascript', json: true },
        readOnly: 'nocursor',
      }}
      onChange={() => {}}
    />
  )
}
