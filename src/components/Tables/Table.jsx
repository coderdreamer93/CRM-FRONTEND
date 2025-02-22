
import React from 'react';
import "./TableStyles.css"

const Table = ({ title, columns, data }) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        {title}
        <a href="#" className="float-right">See All</a>
      </div>
      <div className="card-body">
        <table className="table table-hover">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
