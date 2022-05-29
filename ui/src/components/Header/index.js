import React, { Component } from 'react';
import './Header.css';
import CLOSEICON from '../../assets/ic_close.png';
import SEARCHICON from '../../assets/ic_search.png';
import DROPDOWNARROWICON from '../../assets/ic_down_arrow.png';
import Container from 'react-bootstrap/esm/Container';
import { connect } from 'react-redux';
import { fetch_actions, update_defaultEntries, update_search, update_currentPageVal } from '../../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      entriesMenu: false,
      defaultSearchVal: ''
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(ev) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(ev.target) && !ev.target.classList.contains('dropdown-selected-data') && !ev.target.classList.contains('dropdown-icon')) {
      this.setState({entriesMenu: false});
    }
  }

  toggleEntriesMenu = (value) => {
    const { searchVal, currentSkipVal, currentSortVal, currentSubjFilter } = this.props;
    if(typeof value === 'number') {
      this.props.update_defaultEntries(value);
      this.props.fetch_actions({
        limit: value,
        skip: 0,
        sort: currentSortVal,
        searchVal: searchVal,
        subjects: currentSubjFilter
      })
    }
    this.setState({entriesMenu: !this.state.entriesMenu});
  }

  render() {
    const { defaultEntries, searchVal, currentSkipVal, currentSortVal } = this.props;
    let newSearchFlag = true;
    let timeoutFlag;
    return (
      <Container className='header'>
        <div className='header-left'>
          <div className='header-left-entries'>
            <span className='entries-start-text'>Show </span>
            <div className={'dropdown-div' + (this.state.entriesMenu ? ' active' : '')}>
              <span className='dropdown-selected-data' onClick={() => {this.toggleEntriesMenu('menu')}}>{this.props.defaultEntries}</span>
              <img src={DROPDOWNARROWICON} className='dropdown-icon' alt='search' width='24px' height='24px' onClick={this.toggleEntriesMenu} />
              <ul className='dropdown-list' ref={this.wrapperRef}>
                <li className='dropdown-list-item' onClick={() => {this.toggleEntriesMenu(5)}}>5</li>
                <li className='dropdown-list-item' onClick={() => {this.toggleEntriesMenu(10)}}>10</li>
                <li className='dropdown-list-item' onClick={() => {this.toggleEntriesMenu(20)}}>20</li>
                <li className='dropdown-list-item' onClick={() => {this.toggleEntriesMenu(30)}}>30</li>
                <li className='dropdown-list-item' onClick={() => {this.toggleEntriesMenu(40)}}>40</li>
                <li className='dropdown-list-item' onClick={() => {this.toggleEntriesMenu(50)}}>50</li>
              </ul>
            </div>
            <span className='entries-end-text'> entries</span>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps  = state => ({
  studentList: state.students.studentList,
  defaultEntries: state.students.defaultEntries,
  searchVal: state.students.searchVal,
  currentSortVal: state.students.currentSortVal,  
  currentSubjFilter: state.students.currentSubjFilter,
  currentSkipVal: state.students.currentSkipVal
});

const mapDispatchToProps  = dispatch => ({
  fetch_actions: (data) => dispatch(fetch_actions(data)),
  update_defaultEntries: (data) => dispatch(update_defaultEntries(data)),
  update_search: (data) => dispatch(update_search(data)),
  update_currentPageVal: (data) => dispatch(update_currentPageVal(data))
});

export default  connect(mapStateToProps,mapDispatchToProps)(Header);
