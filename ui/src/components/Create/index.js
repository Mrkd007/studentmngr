import React, { Component } from 'react';
import './Create.css';

import CLOSEICON from '../../assets/ic_close.png';
import CREATEICON from '../../assets/ic_create.png';
import { connect } from 'react-redux';
import { add_action, fetch_actions } from '../../redux/actions'

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
  }

  validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    return (false)
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {name, email, subject} = this.state;
    const { defaultEntries, searchVal, currentSkipVal, currentSortVal } = this.props;
    let errMsg = ''
    if( !name) {
      errMsg = 'Please enter the student name';
    } else if( name.length < 2) {
      errMsg = 'Please enter valid name';
    } else if(!this.validateEmail(email)) {
      errMsg = 'Please enter valide email';
    } else if( !subject) {
      errMsg = 'Please enter the subject name';
    } else if(subject.length < 2) {
      errMsg = 'Please enter valid subject name';
    }

    if(errMsg === '') {
      e.target.reset();
      this.props.add_action({
        "name": name,
        "email": email,
        "subject": subject
      }, ()=> {
        this.props.fetch_actions({
          limit: defaultEntries,
          skip: currentSkipVal,
          sort: currentSortVal,
          searchVal: searchVal
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
              <label htmlFor='subject' className='input-group-label'>Subject: </label>
              <input type='text' className='input-group-input' id='subject' name='subject' placeholder="eg. Robotics" defaultValue={subject} onChange={(e) => {
                this.setState({subject: e.target.value.trim()})
              }} />
            </div>
            <span className='input-error-msg'>{errMsg}</span>
            <button type='submit' className='input-submit-button'>Add Student</button>
          </form>
        </div>
      </div>
      :
      <button className='create-button-wrapper' type='new' title='Add new student Data' onClick={(e) => {
        this.setState({createModal: true})
      }}>
        + <span>Add New</span>
      </button>
  }
      </>
    );
  }
}

const mapStateToProps  = state => ({
  defaultEntries: state.students.defaultEntries,
  searchVal: state.students.searchVal,
  currentSortVal: state.students.currentSortVal,
  currentSkipVal: state.students.currentSkipVal
});

const mapDispatchToProps =  dispatch => ({
  add_action: (data, cb) => dispatch(add_action(data, cb)),
  fetch_actions: (data) => dispatch(fetch_actions(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Create);
