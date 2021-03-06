import React, { Component } from 'react';
import './Table.css';

import SORTICON from '../../assets/ic_sort.png';
import DELETEICON from '../../assets/ic_delete.png';
import CLOSEICON from '../../assets/ic_close.png';
import DELETEICON2 from '../../assets/ic_delete2.png';
import EMPTYFILTER from '../../assets/ic_emptyFilter.png';
import FILLEDFILTER from '../../assets/ic_filledFilter.png';
import Container from 'react-bootstrap/esm/Container';
import { connect } from 'react-redux';
import { fetch_actions, update_sorting, delete_action, update_subjectFilter, update_currentPageVal } from '../../redux/actions'
import Button from 'react-bootstrap/esm/Button';

class Table extends Component {
  constructor() {
    super();
    this.state = {
      showConfirm: false,
      confirmId: '',
      subjFilter: [],
      showSubjectFilter: false
    };

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.subjectArraySet = new Set([]);
  }

  handleClickOutside(ev) {
    if (this.wrapperRef && this.wrapperRef.current && !this.wrapperRef.current.contains(ev.target) && !ev.target.classList.contains('filter-modal') && !ev.target.classList.contains('subjects-header-filter-icon')) {
      this.setState({showSubjectFilter: false});
    }
  }

  componentDidMount() {
    const { defaultEntries, searchVal, currentSkipVal, currentSortVal, currentSubjFilter, fetch_actions, update_currentPageVal  } = this.props;
    fetch_actions({
      limit: defaultEntries,
      skip: 0,
      sort: currentSortVal,
      searchVal: searchVal,
      subjects: currentSubjFilter
    }, ()=> {                  
      update_currentPageVal({
        currentPageVal: 1,
        currentSkipVal: 0
      });
    })
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  InputPage = () => {
    const { subjectArray, currentSubjFilter, update_subjectFilter, defaultEntries, searchVal, currentSortVal, update_currentPageVal } = this.props;
    return (
      <div className='filter-modal'  ref={this.wrapperRef}>
        {
          subjectArray && subjectArray.length ? 
            subjectArray.map((elm, i) => {
              if(currentSubjFilter && currentSubjFilter.includes(elm)) {
                this.subjectArraySet.add(elm);
              } else {
                this.subjectArraySet.delete(elm);
              }
              return(
                <div className="custom-control custom-checkbox" key={i}>
                  <input type="checkbox" defaultChecked={currentSubjFilter && currentSubjFilter.includes(elm)} className="custom-control-input" id={"defaultUnchecked" + (i) } onChange={
                    (e) => {
                      if(e.target.checked) {
                        this.subjectArraySet.add(elm);
                      } else {
                        this.subjectArraySet.delete(elm);
                      }
                    }
                  } />
                  <label className="custom-control-label" htmlFor={"defaultUnchecked" + (i) }>{elm}</label>
                </div>
              );
            })
            :
            null
          }
        <div className='modal-footer-btns'>
          <Button variant="secondary" onClick={(e)=>{
            update_subjectFilter([]);
            this.props.fetch_actions({
              limit: defaultEntries,
              skip: 0,
              sort: currentSortVal,
              searchVal: searchVal,
              subjects: []
            },()=>{                
              update_currentPageVal({
                currentPageVal: 1,
                currentSkipVal: 0
              });
            })
            this.setState({showSubjectFilter: false});
          }}>Clear</Button>
          <Button variant="primary" onClick={(e)=>{
            let selectedData = Array.from(this.subjectArraySet);
            update_subjectFilter(selectedData);
            if(selectedData !== subjectArray) {
              this.props.fetch_actions({
                limit: defaultEntries,
                skip: 0,
                sort: currentSortVal,
                searchVal: searchVal,
                subjects: selectedData
              },()=>{                
                update_currentPageVal({
                  currentPageVal: 1,
                  currentSkipVal: 0
                });
              })
            }
            this.setState({showSubjectFilter: false});
          }}>Filter</Button>
        </div>
      </div>
    )
  }

  render() {
    const { defaultEntries, currentSkipVal, searchVal, currentSortVal, currentSubjFilter } = this.props;
    const { showSubjectFilter } = this.state;
    return (
      <div className='table-wrapper'>
        <Container>
          <div className='table-background-cover'></div>
          <div className='table-header'>
            <div className={'table-header-data id-header' + ((currentSortVal === 'studentId') || (currentSortVal === '-studentId') ? ' sort-effect' : '')}>
              <span className='id-header-text' title='Student ID'>Student ID{((currentSortVal === 'studentId') || (currentSortVal === '-studentId') ? '*' : '')}</span>
              <img className={'id-header-sort-icon' + (currentSortVal === '-studentId' ? ' reverse' : '')} src={SORTICON} alt='sort' height='24px' width='24px' title={currentSortVal === '-studentId' ? 'descending' : 'ascending'} onClick={() => {
                let valueToupdate = currentSortVal !== '-studentId' ? '-studentId' : 'studentId'
                this.props.update_sorting(valueToupdate);
                this.props.fetch_actions({
                  limit: defaultEntries,
                  skip: currentSkipVal,
                  sort: valueToupdate,
                  searchVal: searchVal,
                  subjects: currentSubjFilter
                },()=>{});
              }} />
            </div>
            <div className={'table-header-data name-header' + ((currentSortVal === 'name') || (currentSortVal === '-name') ? ' sort-effect' : '')}>
              <span className='name-header-text' title='Name'>Name{((currentSortVal === 'name') || (currentSortVal === '-name') ? '*' : '')}</span>
              <img className={'name-header-sort-icon' + (currentSortVal === '-name' ? ' reverse' : '')} src={SORTICON} alt='sort' height='24px' width='24px' title={currentSortVal === '-name' ? 'descending' : 'ascending'} onClick={() => {
                let valueToupdate = currentSortVal !== '-name' ? '-name' : 'name'
                this.props.update_sorting(valueToupdate);
                this.props.fetch_actions({
                  limit: defaultEntries,
                  skip: currentSkipVal,
                  sort: valueToupdate,
                  searchVal: searchVal,
                  subjects: currentSubjFilter
                },()=>{});
              }}  />
            </div>
            <div className='table-header-data email-header'>
              <span className='email-header-text'>Eamil</span>
            </div>
            <div className='table-header-data sub-header'>
              <span className='sub-header-text' title='Subjects'>Subjects</span>
              <img className='subjects-header-filter-icon' src={currentSubjFilter.length ? FILLEDFILTER : EMPTYFILTER} alt='Filter' height='24px' width='24px' title='Filter' onClick={() => {
                this.setState({showSubjectFilter: !showSubjectFilter})
              }}  />
              { showSubjectFilter ? this.InputPage() : null}
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
                      },()=>{});
                    },300)
                    this.setState({showConfirm: false, confirmId: ''})
                  }}>Delete</button>
                </div>
              </div>
            </div>
            :
            null
          }
          <div className='table-body'>
          {
            this.props.studentList && 
            this.props.studentList.length ?
            this.props.studentList.map((elm, i) => {
              return(
                <div className='table-row-wrapper'>
                <div className='table-row' key = {i}>
                  <div className='table-row-data id-row'>
                    <span className='id-row-text'>{elm.studentId ? elm.studentId : 'NA'}</span>
                  </div>
                  <div className='table-row-data name-row'>
                    <span className='name-row-text'>{elm.name ? elm.name : 'NA'}</span>
                  </div>
                  <div className='table-row-data email-row'>
                    <span className='email-row-text'>{elm.email ? elm.email : 'NA'}</span>
                  </div>
                  <div className='table-row-data sub-row'>
                    <span className='sub-row-text'>{elm.subject ? elm.subject.join(", ") : 'NA'}</span>
                  </div>
                  <div className='table-row-extra'>
                    <img className='delete-row-icon' src={DELETEICON} alt='delete' title='Delete' height='24px' width='24px' onClick={() => {
                      this.setState({showConfirm: true, confirmId: elm._id});
                    }} />
                  </div>
                </div>
                <div className='mobile-email-row-text'>{elm.email ? elm.email : 'NA'}</div>
                </div>
              );
            })
            :
            <span className='empty-table'>No record found</span>
          }
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps  = state => ({
  studentList: state.students.studentList ? state.students.studentList : [],
  defaultEntries: state.students.defaultEntries,
  currentSortVal: state.students.currentSortVal,
  currentSkipVal: state.students.currentSkipVal,
  searchVal: state.students.searchVal,
  currentSubjFilter: state.students.currentSubjFilter,
  subjectArray: state.students.subjectArray
});

const mapDispatchToProps  = dispatch => ({
  fetch_actions: (data, cb) => dispatch(fetch_actions(data, cb)),
  update_sorting: (data) => dispatch(update_sorting(data)),
  delete_action: (data) => dispatch(delete_action(data)),
  update_subjectFilter: (data) => dispatch(update_subjectFilter(data)),
  update_currentPageVal: (data) => dispatch(update_currentPageVal(data))
});

export default  connect(mapStateToProps,mapDispatchToProps)(Table);
