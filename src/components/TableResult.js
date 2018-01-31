import React from 'react';
import { Table } from 'react-bootstrap';

export default function JsonResult({ value }) {
  if (!value) {
    return '';
  }

  const { rows } = JSON.parse(value);
  return (
    <Table striped bordered condensed>
      <tbody>
        {rows.map((row, rIndex) =>
          <tr key={rIndex}>
            {row.map((col, cIndex) => <td key={cIndex}>{col}</td>)}
          </tr>
        )}
      </tbody>
    </Table>
  )
}
