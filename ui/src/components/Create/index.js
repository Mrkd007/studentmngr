import React, { Component } from 'react';
import './Create.css';

import CLOSEICON from '../../assets/ic_close.png';
import CREATEICON from '../../assets/ic_create.png';
import { connect } from 'react-redux';
import { add_action, fetch_actions } from '../../redux/actions'
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      createModal: false,
      name: '',
      email: '',
      subject: '',
      errMsg: ''
    };
    this.subjectArraySet = new Set([]);
  }

  validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { defaultEntries, searchVal, currentSkipVal, currentSortVal, currentSubjFilter } = this.props;
    let selectedData = Array.from(this.subjectArraySet);
    let errMsg = ''
    if( !name) {
      errMsg = 'Please enter the student name';
    } else if( name.length < 2) {
      errMsg = 'Please enter valid name';
    } else if(!this.validateEmail(email)) {
      errMsg = 'Please enter valide email';
    } else if(selectedData.length < 1) {
      errMsg = 'Please select at list one subject';
    }

    if(errMsg === '') {
      e.target.reset();
      this.props.add_action({
        "name": name,
        "email": email,
        "subject": selectedData
      }, ()=> {
        this.props.fetch_actions({
          limit: defaultEntries,
          skip: currentSkipVal,
          sort: currentSortVal,
          searchVal: searchVal,
          subjects: currentSubjFilter
        })
      })
      this.setState({errMsg: '', name: '', email: '', subject: '', createModal: false});
    } else {
      this.setState({errMsg: errMsg});
      let removeErr = setTimeout(()=>{
        this.setState({errMsg: ''});
      },3000)
      clearTimeout(removeErr);
    }
  }

  render() {
    const {createModal, name, email, subject, errMsg} = this.state;
    const { subjectArray } = this.props;
    return (
      <>
      {createModal ?
      <div className='create-conatiner'>
        <div className='create-wrapper'>
          <img src={CLOSEICON} className='create-close-icon' alt='close' title='Close' width='24px' height='24px' onClick={(e) => {
            this.setState({createModal: false})
          }} />          
          <div className='confirm-header-container'>
            <img src={CREATEICON} className='delet-icon' alt='Delete' title='Delete' width='45px' height='45px' />
            <h1 className='confirm-header-title'>Add Student</h1>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className='input-group'>
              <label htmlFor='name' className='input-group-label'>Name: </label>
              <input type='text' className='input-group-input' id='name' name='name' defaultValue={name} placeholder="eg. Robbin" onChange={(e) => {
                this.setState({name: e.target.value.trim()})
              }} />
            </div>
            <div className='input-group'>
              <label htmlFor='email' className='input-group-label'>Email: </label>
              <input type='text' className='input-group-input' id='email' name='email' defaultValue={email} placeholder="eg. robbin@fly.com" onChange={(e) => {
                this.setState({email: e.target.value.trim()})
              }} />
            </div>
            <div className='input-group'>
              <label htmlFor='subject' className='input-group-label'>Subjects: </label>
              <div className='subject-array' id='subject'>
                {
                  subjectArray.length ? 
                    subjectArray.map((elm, i) => {
                      return (
                        <div className="custom-control custom-checkbox custom-control-inline" key={i}>
                          <input type="checkbox" className="custom-control-input" id={"defaultInline" + (i)} onChange={
                            (e) => {
                              if(e.target.checked) {
                                this.subjectArraySet.add(elm);
                              } else {
                                this.subjectArraySet.delete(elm);
                              }
                            }
                          } />
                          <label className="custom-control-label" htmlFor={"defaultInline" + (i)}>{elm}</label>
                        </div>
                      )
                    }) 
                    : 
                    <input type='text' className='input-group-input' name='subject' placeholder="eg. Robotics" defaultValue={subject} onChange={(e) => {
                      this.setState({subject: e.target.value.trim()})
                    }} />
                }
              </div>
            </div>
            <span className='input-error-msg'>{errMsg}</span>
            <Button type='submit' className='input-submit-button'>Add Student</Button>
          </form>
        </div>
      </div>
      :
      <Container className='create-button-wrapper'>
        <Button className='create-button' type='new' title='Add new student Data' onClick={(e) => {
          this.setState({createModal: true})
        }}>
          + <span>Add New</span>
        </Button>
      </Container>
  }
      </>
    );
  }
}

const mapStateToProps  = state => ({
  defaultEntries: state.students.defaultEntries,
  searchVal: state.students.searchVal,
  currentSortVal: state.students.currentSortVal,
  currentSkipVal: state.students.currentSkipVal,
  currentSubjFilter: state.students.currentSubjFilter,
  subjectArray: state.students.subjectArray
});

const mapDispatchToProps =  dispatch => ({
  add_action: (data, cb) => dispatch(add_action(data, cb)),
  fetch_actions: (data) => dispatch(fetch_actions(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Create);
