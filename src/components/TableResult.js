import React from 'react';
import { Table } from 'react-bootstrap';

export default function JsonResult({ value }) {
  if (!value) {
    return '';
  }

  let { rows } = JSON.parse(value);

  // sort by timestamp and convert timestamp to dates
  if (rows[0] && rows[0].length > 1 && !isNaN(parseInt(rows[0][0], 10))) {
    rows = rows
      .sort((r1, r2) => r1[0] - r2[0])
      .map(([timestamp, ...cols]) => {
        const formattedDate = new Date(timestamp).toLocaleString();
        return [formattedDate, ...cols];
      })
  }

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
