import React, { Component } from 'react';
import './Table.css';

import SORTICON from '../../assets/ic_sort.png';
import DELETEICON from '../../assets/ic_delete.png';
import CLOSEICON from '../../assets/ic_close.png';
import DELETEICON2 from '../../assets/ic_delete2.png';
import { connect } from 'react-redux';
import { fetch_actions, update_sorting, delete_action } from '../../redux/actions'

class Table extends Component {
  constructor() {
    super();
    this.state = {
      showConfirm: false,
      confirmId: ''
    };
  }

  componentDidMount() {
    const { defaultEntries, searchVal, currentSkipVal, currentSortVal } = this.props;
    this.props.fetch_actions({
      limit: defaultEntries,
      skip: currentSkipVal,
      sort: currentSortVal,
      searchVal: searchVal
    })
  }

  render() {
    const { defaultEntries, currentSkipVal, searchVal, currentSortVal } = this.props
    return (
      <div className='table-wrapper'>
        <div className='table-header'>
          <div className={'table-header-data id-header' + ((currentSortVal === 'studentId') || (currentSortVal === '-studentId') ? ' sort-effect' : '')}>
            <span className='id-header-text'>Student ID{((currentSortVal === 'studentId') || (currentSortVal === '-studentId') ? '*' : '')}</span>
            <img className={'id-header-sort-icon' + (currentSortVal === '-studentId' ? ' reverse' : '')} src={SORTICON} alt='sort' height='24px' width='24px' title={currentSortVal === '-studentId' ? 'descending' : 'ascending'} onClick={() => {
              let valueToupdate = currentSortVal !== '-studentId' ? '-studentId' : 'studentId'
              this.props.update_sorting(valueToupdate);
              this.props.fetch_actions({
                limit: defaultEntries,
                skip: currentSkipVal,
                sort: valueToupdate,
                searchVal: searchVal
              });
            }} />
          </div>
          <div className='table-header-data email-header'>
            <span className='email-header-text'>Eamil</span>
          </div>
          <div className={'table-header-data name-header' + ((currentSortVal === 'name') || (currentSortVal === '-name') ? ' sort-effect' : '')}>
            <span className='name-header-text'>Name{((currentSortVal === 'name') || (currentSortVal === '-name') ? '*' : '')}</span>
            <img className={'name-header-sort-icon' + (currentSortVal === '-name' ? ' reverse' : '')} src={SORTICON} alt='sort' height='24px' width='24px' title={currentSortVal === '-name' ? 'descending' : 'ascending'} onClick={() => {
              let valueToupdate = currentSortVal !== '-name' ? '-name' : 'name'
              this.props.update_sorting(valueToupdate);
              this.props.fetch_actions({
                limit: defaultEntries,
                skip: currentSkipVal,
                sort: valueToupdate,
                searchVal: searchVal
              });
            }}  />
          </div>
          <div className='table-header-data sub-header'>
            <span className='sub-header-text'>Subject</span>
          </div>
          <div className='table-header-extra'></div>
        </div>
        { this.state.showConfirm ?
          <div className='confirm-box'>
            <div className='confirm-wrapper'>
              <img src={CLOSEICON} className='create-close-icon' alt='close' title='Close' width='24px' height='24px' onClick={(e) => {
                this.setState({showConfirm: false, confirmId: ''})
              }} />
              <div className='confirm-header-container'>
                <img src={DELETEICON2} className='delet-icon' alt='Delete' title='Delete' width='45px' height='45px' />
                <h1 className='confirm-header-title'>Are you Sure ?</h1>
              </div>
              <div className='confirm-body-container'>
                <p className='confirm-body-text'>
                  Do you really want to delete these records?<br></br>
                  This process cannot be undone.
                </p>
              </div>
              <div className='confirm-footer-container'>
                <button type='cancel' className='confirm-cancel-buttton' onClick={(e) => {
                  this.setState({showConfirm: false, confirmId: ''})
                }}>Cancel</button>
                <button type='delete' className='confirm-delete-buttton' onClick={(e) => {
                  this.props.delete_action(this.state.confirmId);
                  setTimeout(() => {
                    this.props.fetch_actions({
                      limit: defaultEntries,
                      skip: currentSkipVal,
                      sort: currentSortVal,
                      searchVal: searchVal
                    });
                  },300)
                  this.setState({showConfirm: false, confirmId: ''})
                }}>Delete</button>
              </div>
            </div>
          </div>
          :
          null
        }
        {
          this.props.studentList && 
          this.props.studentList.length ?
          this.props.studentList.map((elm, i) => {
            return(
              <div className='table-row' key = {i}>
                <div className='table-row-data id-row'>
                  <span className='id-row-text'>{elm.studentId ? elm.studentId : 'NA'}</span>
                </div>
                <div className='table-row-data email-row'>
                  <span className='email-row-text'>{elm.email ? elm.email : 'NA'}</span>
                </div>
                <div className='table-row-data name-row'>
                  <span className='name-row-text'>{elm.name ? elm.name : 'NA'}</span>
                </div>
                <div className='table-row-data sub-row'>
                  <span className='sub-row-text'>{elm.subject ? elm.subject : 'NA'}</span>
                </div>
                <div className='table-row-extra'>
                  <img className='delete-row-icon' src={DELETEICON} alt='delete' title='Delete' height='24px' width='24px' onClick={() => {
                    this.setState({showConfirm: true, confirmId: elm._id});
                  }} />
                </div>
              </div>
            );
          })
          :
          <span className='empty-table'>No record found</span>
        }
      </div>
    );
  }
}

const mapStateToProps  = state => ({
  studentList: state.students.studentList ? state.students.studentList : [],
  defaultEntries: state.students.defaultEntries,
  currentSortVal: state.students.currentSortVal,
  currentSkipVal: state.students.currentSkipVal
});

const mapDispatchToProps  = dispatch => ({
  fetch_actions: (data) => dispatch(fetch_actions(data)),
  update_sorting: (data) => dispatch(update_sorting(data)),
  delete_action: (data) => dispatch(delete_action(data))
});

export default  connect(mapStateToProps,mapDispatchToProps)(Table);
