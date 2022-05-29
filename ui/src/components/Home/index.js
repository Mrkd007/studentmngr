import React, { Component } from 'react';
import Create from '../Create';
import Header from '../Header';
import NavBar from '../Navbar';
import Pagination from '../Pagination';
import Table from '../Table';
import './Home.css';
import Container from './../../../node_modules/react-bootstrap/esm/Container';

class Home extends Component {
  render() {
    return (
      <>
      <NavBar />
      <div className='conatiner'>
        <Container>
          <h1 className='container-header'>Student Table</h1>
        </Container>
        <Header />
        <Table />
        <Pagination />
        <Create />
      </div>
      </>
    );
  }
}

export default Home;
