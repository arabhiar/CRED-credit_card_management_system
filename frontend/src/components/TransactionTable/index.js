import React from 'react';
import { Table } from 'react-bootstrap';

import './styles.scss';

const TransactionTable = () => {
  let transactions = [
    {
      user: 'Abhishek Ranjan',
      vendor: 'Amazon',
      category: 'Shopping',
      date: '26 March 2021, 12:30 PM',
      creddev: 1,
      amount: 500.0,
    },
    {
      user: 'Abhishek Ranjan',
      vendor: 'Amazon',
      category: 'Shopping',
      date: '26 March 2021, 12:30 PM',
      creddev: 1,
      amount: 500.0,
    },
    {
      user: 'Abhishek Ranjan',
      vendor: 'Amazon',
      category: 'Shopping',
      date: '26 March 2021, 12:30 PM',
      creddev: 0,
      amount: 500.0,
    },
    {
      user: 'Abhishek Ranjan',
      vendor: 'Amazon',
      category: 'Shopping',
      date: '26 March 2021, 12:30 PM',
      creddev: 1,
      amount: 500.0,
    },
    {
      user: 'Abhishek Ranjan',
      vendor: 'Amazon',
      category: 'Shopping',
      date: '26 March 2021, 12:30 PM',
      creddev: 0,
      amount: 500.0,
    },
  ];

  return (
    <div className="transaction-table">
      <h2 style={{marginTop: '1.5rem'}}>Transactions</h2>
      <Table
        hover
        responsive
        className="table table-dark table-borderless table-sm"
        style={{marginTop: '2rem'}}
      >
        <thead>
          <tr>
            <th>User</th>
            <th>Vendor</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount(₹)</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr>
                <td>{transaction.user}</td>
                <td>{transaction.vendor}</td>
                <td>{transaction.category}</td>
                <td className="text-muted">{transaction.date}</td>
                <td>
                  <span
                    className={`fas fa-arrow-${
                      transaction.creddev === 1 ? 'down' : 'up'
                    }`}
                  ></span>{' '}
                  {transaction.amount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TransactionTable;
