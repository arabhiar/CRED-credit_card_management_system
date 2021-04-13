import React from 'react';
import { Table } from 'react-bootstrap';

import './styles.scss';

const TransactionTable = (props) => {
  const { transactions } = props;

  const parseDate = (sDate) => {
    let date = new Date(sDate);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  };

  const capitalizeWord = (word) => {
    if (word !== 'NA') {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
  };

  return (
    <div className="transaction-table">
      {transactions.length === 0 ? (
        <p style={{ fontSize: '1.0rem', fontWeight: '400', marginTop: '2rem' }}>
          No transactions found
        </p>
      ) : (
        <Table
          hover
          responsive
          className="table table-dark table-borderless table-sm"
          style={{ marginTop: '2rem' }}
        >
          <thead>
            <tr>
              <th>User</th>
              <th>Vendor</th>
              <th>Category</th>
              <th>Date</th>
              <th>Outstanding Amount(₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>{transaction.userAssociated}</td>
                  <td>{capitalizeWord(transaction.vendor)}</td>
                  <td>{capitalizeWord(transaction.category)}</td>
                  <td className="text-muted">
                    {parseDate(transaction.transactionDateTime)}
                  </td>
                  <td>
                    <span
                      className={`fas fa-arrow-${
                        transaction.credDeb === true ? 'down' : 'up'
                      }`}
                    ></span>{' '}
                    {transaction.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TransactionTable;
