import React, { Component } from 'react';
import './NavBar.css'
import Container from './../../../node_modules/react-bootstrap/esm/Container';
import Navbar from './../../../node_modules/react-bootstrap/esm/Navbar';
import Form from './../../../node_modules/react-bootstrap/esm/Form';
import FormControl from './../../../node_modules/react-bootstrap/esm/FormControl';
import Button from './../../../node_modules/react-bootstrap/esm/Button';
import { fetch_actions, update_defaultEntries, update_search, update_currentPageVal } from '../../redux/actions';

import PROJECTICON from '../../assets/icon1.png';
import SEARCHICON from '../../assets/ic_search.png';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      currentInputVal: '',
      newSearchFlag: true
    };
  }

  updateSearchVal = () => {
    const { currentInputVal, newSearchFlag } = this.state;
    const { update_search, update_currentPageVal, fetch_actions, defaultEntries, currentSkipVal, currentSortVal, searchVal, currentSubjFilter } = this.props
    if(currentInputVal !== searchVal) {
      if(newSearchFlag) {
        update_search(currentInputVal);
        update_currentPageVal({
          currentPageVal: 1,
          currentSkipVal: 0
        });
        this.setState({ newSearchFlag: false});
        fetch_actions({
          limit: defaultEntries,
          skip: 0,
          sort: currentSortVal,
          searchVal: currentInputVal,
          subjects: currentSubjFilter
        }, () => {
          this.setState({ newSearchFlag: true});
        })
      }
    }
  }

  render() {
    const { currentInputVal } = this.state;
    return (
      <Navbar bg="primary" variant="dark">
        <Container className='nav-conatiner'>
          <Navbar.Brand href="#home">
            <img
              src= {PROJECTICON}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Student Management"
            />
            &nbsp;&nbsp;
            <span className='header-nav-title'>Student Management</span>
          </Navbar.Brand>
          <Form className="d-flex" onSubmit={(e) => {
                e.preventDefault();
                this.updateSearchVal();
              }}>
            <FormControl
              type="search"
              placeholder="Search the record"
              className={"me-2 search-input-box" + (currentInputVal !== '' ? ' active' : '')}
              aria-label="Search"
              onChange={(e) => {
                if(currentInputVal !== '' && e.target.value === '') {
                  this.setState({currentInputVal: ''},() => {
                    this.updateSearchVal()
                  })
                } else {
                  this.setState({currentInputVal: e.target.value})
                }
              }}
            />
            <Button type="submit" variant="success">
              <img
                src= {SEARCHICON}
                width="22"
                height="22"
                className="d-inline-block align-top"
                alt="Search"
              />
            </Button>
          </Form>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps  = state => ({
  studentList: state.students.studentList,
  defaultEntries: state.students.defaultEntries,
  searchVal: state.students.searchVal,
  currentSortVal: state.students.currentSortVal,
  currentSkipVal: state.students.currentSkipVal,
  currentSubjFilter: state.students.currentSubjFilter
});

const mapDispatchToProps  = dispatch => ({
  fetch_actions: (data, cb) => dispatch(fetch_actions(data, cb)),
  update_defaultEntries: (data) => dispatch(update_defaultEntries(data)),
  update_search: (data) => dispatch(update_search(data)),
  update_currentPageVal: (data) => dispatch(update_currentPageVal(data))
});

export default  connect(mapStateToProps,mapDispatchToProps)(NavBar);
