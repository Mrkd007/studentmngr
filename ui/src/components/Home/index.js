import React, { Component } from 'react';
import Create from '../Create';
import Header from '../Header';
import Pagination from '../Pagination';
import Table from '../Table';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className='conatiner'>
        <h1 className='container-header'>Student Table</h1>
        <Header />
        <Table />
        <Pagination />
        <Create />
      </div>
    );
  }
}

export default Home;
