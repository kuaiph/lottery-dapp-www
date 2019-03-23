import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {

  const { account, accountBal } = props;

  return(<header>
    <h1><Link to="/">Lottery Pot</Link></h1>
    <div><Link to="/pots?filter=historical&sortBy=closedTimeDescending">Historical</Link></div>
    <div><button type="button" className="btn btn-primary"
      data-toggle="modal" data-target="#potsNewModal">Create New Pot</button></div>
    <div>Account: { account }</div>
    <div>Balance: { accountBal }</div>
  </header>)
};
