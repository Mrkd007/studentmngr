import React, { Component } from 'react';
import './Table.css';

import SORTICON from '../../assets/ic_sort.png';
import DELETEICON from '../../assets/ic_delete.png';
import { connect } from 'react-redux';
import { fetch_actions, update_sorting, delete_action } from '../../redux/actions'

class Table extends Component {
  constructor() {
    super();
    this.state = {
      students: [
        {
          studentId: 1,
          email: 'chalu@abc.com',
          name: 'Raju',
          subjects: 'PCMB'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        },
        {
          studentId: 2,
          email: 'aam@abc.com',
          name: 'Shyam',
          subjects: 'PCB'
        },
        {
          studentId: 3,
          email: 'chasma@abc.com',
          name: 'Babu Bhaiya',
          subjects: 'PCM'
        }
      ]
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
          <div className='table-header-data id-header'>
            <span className='id-header-text'>Student ID</span>
            <img className={'id-header-sort-icon' + (this.props.currentSortVal === '-studentId' ? ' reverse' : '')} src={SORTICON} alt='sort' height='24px' width='24px' onClick={() => {
              let valueToupdate = this.props.currentSortVal !== '-studentId' ? '-studentId' : 'studentId'
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
          <div className='table-header-data name-header'>
            <span className='name-header-text'>Name</span>
            <img className={'name-header-sort-icon' + (this.props.currentSortVal === '-name' ? ' reverse' : '')} src={SORTICON} alt='sort' height='24px' width='24px' onClick={() => {
              let valueToupdate = this.props.currentSortVal !== '-name' ? '-name' : 'name'
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
                  <span className='sub-row-text'>{elm.subjects ? elm.subjects : 'NA'}</span>
                </div>
                <div className='table-row-extra'>
                  <img className='delete-row-icon' src={DELETEICON} alt='delete' title='Delete' height='24px' width='24px' onClick={() => {
                    this.props.delete_action(elm._id);
                    this.props.fetch_actions({
                      limit: defaultEntries,
                      skip: currentSkipVal,
                      sort: currentSortVal,
                      searchVal: searchVal
                    });
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
