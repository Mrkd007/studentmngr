import React, { Component } from 'react';
import './Pagination.css';

import PREVIOUSICON from '../../assets/ic_prev.png';
import NEXTICON from '../../assets/ic_next.png';
import Container from './../../../node_modules/react-bootstrap/esm/Container';
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
    if(val === 'prev' && tempPageVal > 1) {
      tempPageVal = tempPageVal - 1;
    } else if(val === 'next' && tempPageVal < lastValue) {
      tempPageVal = tempPageVal + 1;
      this.props.update_currentPageVal(tempPageVal + 1);
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
      });
      setTimeout(()=> {
        this.updateData();
      },100)
    }
  }

  updateData = () => {
    const { defaultEntries, count, currentPageProp } = this.props;
    const tempcalaculatepageval = parseInt(count / defaultEntries) + ((count % defaultEntries) > 0 ? 1 : 0 );
    if(tempcalaculatepageval <= 5) {
      let tempArr = [];
      for(let i = 0; i < tempcalaculatepageval; i++) {
        tempArr.push(i+1)
      }
      this.setState({paginationArray: tempArr, calaculatepageval: tempcalaculatepageval})
    } else {
      let tempArr = []
      if(currentPageProp === 1) {
        tempArr = [1, 2, '...', tempcalaculatepageval-1, tempcalaculatepageval]
      } else if(currentPageProp === 2) {
        tempArr = [1, 2, 3, '...', tempcalaculatepageval]
      } else if(currentPageProp === 3 && tempcalaculatepageval === 6) {
        tempArr = [1, 2, 3, 4, 5, 6]
      } else if(currentPageProp === 3 && tempcalaculatepageval > 6) {
        tempArr = [1, 2, 3, 4, '...', tempcalaculatepageval]
      } else if(currentPageProp === 4) {
        tempArr = [1, 2, 3, 4, 5, 6, 7]
      } else if(currentPageProp > 4 ) {
        tempArr = [1, '...', currentPageProp-1, currentPageProp, currentPageProp+1, '...', tempcalaculatepageval]
      } else if(currentPageProp === (tempcalaculatepageval - 2) && tempcalaculatepageval > 6) {
        tempArr = [1, '...', tempcalaculatepageval-3, tempcalaculatepageval-2, tempcalaculatepageval-1, tempcalaculatepageval]
      } else if(currentPageProp === (tempcalaculatepageval - 2) && tempcalaculatepageval === 6) {
        tempArr = [1, 2, 3, 4, 5, 6]
      } else if(currentPageProp === (tempcalaculatepageval - 1)) {
        tempArr = [1, '...', tempcalaculatepageval-2, tempcalaculatepageval-1, tempcalaculatepageval]
      } else if(currentPageProp === tempcalaculatepageval) {
        tempArr = [1, 2, '...', tempcalaculatepageval-1, tempcalaculatepageval]
      }
      this.setState({paginationArray: tempArr, calaculatepageval: tempcalaculatepageval})
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
    
    return (
      <Container className='pagination-conatiner'>
        <img src={PREVIOUSICON} className='prev-icon pagination-box' alt='Previous' title='previous' width='24px' height='24px' onClick={() => {this.handlePagination('prev')}} />
        <div className='pagination-group'>
          {
            paginationArray.map((elm, i) => {
              return(<span className={'pagination-box' + (currentPageProp === elm ? ' active' : '')} key={i} title={elm} onClick={() => {this.handlePagination(elm)}}>{elm}</span>);
            })
          }
        </div>
        <img src={NEXTICON} className='next-icon pagination-box' alt='Next' title='Next' width='24px' height='24px' onClick={() => {this.handlePagination('next', calaculatepageval)}} />
      </Container>
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
