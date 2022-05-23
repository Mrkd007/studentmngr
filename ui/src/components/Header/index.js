import React, { Component } from 'react';
import './Header.css';
import CLOSEICON from '../../assets/ic_close.png';
import SEARCHICON from '../../assets/ic_search.png';
import DROPDOWNARROWICON from '../../assets/ic_down_arrow.png';
import { connect } from 'react-redux';
import { fetch_actions, update_defaultEntries, update_search, update_currentPageVal } from '../../redux/actions'

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
    const { searchVal, currentSkipVal, currentSortVal } = this.props;
    if(typeof value === 'number') {
      this.props.update_defaultEntries(value);
      this.props.fetch_actions({
        limit: value,
        skip: currentSkipVal,
        sort: currentSortVal,
        searchVal: searchVal
      })
    }
    this.setState({entriesMenu: !this.state.entriesMenu});
  }

  render() {
    const { defaultEntries, searchVal, currentSkipVal, currentSortVal } = this.props;
    let newSearchFlag = true;
    let timeoutFlag;
    return (
      <div className='header'>
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
        <div className='header-right'>
          <div className='search-box'>
            <img src={SEARCHICON} className='search-icon' alt='search' width='24px' height='24px' />
            <img src={CLOSEICON} className={'clear-icon' + (searchVal !== '' ? '' : ' hidden')} alt='clear' width='24px' height='24px' onClick={() => {
              this.props.update_search('');
              document.getElementById('searchInput').value = '';
              this.props.fetch_actions({
                limit: defaultEntries,
                skip: currentSkipVal,
                sort: currentSortVal,
                searchVal: ''
              })
            }} />
            <input type='text' className={'search-input' + ( searchVal && searchVal !== '' ? ' hasvalue': '')} id='searchInput' defaultValue={searchVal} title='search will show the results in table' placeholder='Search here'
            onChange={(e) => {
              let value = e.target.value.trim();
              clearInterval(timeoutFlag);
              if(value !== searchVal) {
                this.props.update_search(value);
                this.props.update_currentPageVal({
                  currentPageVal: 1,
                  currentSkipVal: 0
                });
                if(newSearchFlag) {
                  newSearchFlag = false;
                  timeoutFlag = setTimeout(() => {
                    newSearchFlag = true;
                    this.props.fetch_actions({
                      limit: defaultEntries,
                      skip: currentSkipVal,
                      sort: currentSortVal,
                      searchVal: value
                    })
                  }, 500)
                }
                
              }
            }}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps  = state => ({
  studentList: state.students.studentList,
  defaultEntries: state.students.defaultEntries,
  searchVal: state.students.searchVal,
  currentSortVal: state.students.currentSortVal,
  currentSkipVal: state.students.currentSkipVal
});

const mapDispatchToProps  = dispatch => ({
  fetch_actions: (data) => dispatch(fetch_actions(data)),
  update_defaultEntries: (data) => dispatch(update_defaultEntries(data)),
  update_search: (data) => dispatch(update_search(data)),
  update_currentPageVal: (data) => dispatch(update_currentPageVal(data))
});

export default  connect(mapStateToProps,mapDispatchToProps)(Header);
