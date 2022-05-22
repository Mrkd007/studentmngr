import React, { Component } from 'react';
import './Pagination.css';

import FIRSTICON from '../../assets/ic_first.png';
import PREVIOUSICON from '../../assets/ic_prev.png';
import NEXTICON from '../../assets/ic_next.png';
import LASTIOCN from '../../assets/ic_end.png';
import { connect } from 'react-redux';
import { update_currentPageVal, fetch_actions } from '../../redux/actions'

class Pagination extends Component {
  constructor() {
    super();
    this.state = {
      paginationArray: [1],
      currentPage: 1,
      calaculatepageval: 1
    };
  }

  handlePagination = (val, lastValue) => {
    const { defaultEntries, currentPageProp, currentSortVal, searchVal } = this.props;
    let tempPageVal = currentPageProp
    if(val === 'first' && tempPageVal > 1) {
      tempPageVal = 1;
    } else if(val === 'prev' && tempPageVal > 1) {
      tempPageVal = tempPageVal - 1;
    } else if(val === 'next' && tempPageVal < lastValue) {
      tempPageVal = tempPageVal + 1;
      this.props.update_currentPageVal(tempPageVal + 1);
    } else if(val === 'last' && tempPageVal < lastValue) {
      tempPageVal = lastValue;
    } else if(typeof val === 'number' && val !== tempPageVal) {
      tempPageVal = val;
    }

    if(val !== '...') {
      this.props.update_currentPageVal({
        'currentPageVal': tempPageVal,
        'currentSkipVal': (tempPageVal - 1) * defaultEntries
      });
      this.props.fetch_actions({
        limit: defaultEntries,
        skip: (tempPageVal - 1) * defaultEntries,
        sort: currentSortVal,
        searchVal: searchVal
      })
    }
  }

  updateData = () => {
    const { defaultEntries, count, update_currentPageVal } = this.props;
    const tempcalaculatepageval = parseInt(count / defaultEntries) + ((count % defaultEntries) > 0 ? 1 : 0 );
    if(tempcalaculatepageval)
    console.log(count, defaultEntries);
    if(tempcalaculatepageval <= 5) {
      let tempArr = [];
      for(let i = 0; i < tempcalaculatepageval; i++) {
        tempArr.push(i+1)
      }
      this.setState({paginationArray: tempArr, calaculatepageval: tempcalaculatepageval})
    } else {
      this.setState({paginationArray: [1, 2, '...', tempcalaculatepageval-1, tempcalaculatepageval], calaculatepageval: tempcalaculatepageval})
    }
  }

  componentDidUpdate(data) {
    if(data.defaultEntries !== this.props.defaultEntries || data.count !== this.props.count) {
      this.updateData();
    }
  }

  componentDidMount() {
    this.updateData();
  }

  render() {
    const { calaculatepageval, paginationArray} = this.state;
    const { currentPageProp } = this.props;
    
    console.log('check', paginationArray)
    
    return (
      <div className='pagination-conatiner'>
        <img src={FIRSTICON} className='first-icon pagination-box' alt='First' title='First' width='24px' height='24px' onClick={() => {this.handlePagination('first')}} />
        <img src={PREVIOUSICON} className='prev-icon pagination-box' alt='Previous' title='previous' width='24px' height='24px' onClick={() => {this.handlePagination('prev')}} />
        {
          paginationArray.map((elm, i) => {
            return(<span className='pagination-box' key={i} title={elm} onClick={() => {this.handlePagination(elm)}}>{elm}</span>);
          })
        }
        <img src={NEXTICON} className='next-icon pagination-box' alt='Next' title='Next' width='24px' height='24px' onClick={() => {this.handlePagination('next', calaculatepageval)}} />
        <img src={LASTIOCN} className='last-icon pagination-box' alt='Last' title='Last' width='24px' height='24px' onClick={() => {this.handlePagination('last', calaculatepageval)}} />
        <span className='current-page'>Current Page: {currentPageProp}</span>
      </div>
    );
  }
}

const mapStateToProps  = state => ({
  count: state.students.count,
  defaultEntries: state.students.defaultEntries,
  currentPageProp: state.students.currentPageVal,
  currentSortVal: state.students.currentSortVal,
  searchVal: state.students.searchVal
});

const mapDispatchToProps  = dispatch => ({
  update_currentPageVal: (data) => dispatch(update_currentPageVal(data)),
  fetch_actions: (data) => dispatch(fetch_actions(data)),
  // update_defaultEntries: (data) => dispatch(update_defaultEntries(data))
});

export default  connect(mapStateToProps,mapDispatchToProps)(Pagination);
