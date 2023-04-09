import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          address: '',
        };

        this.listenToEmitter();
    }

    listenToEmitter() {
      emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
        this.setState({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          address: '',
        })
      })
    }

    componentDidMount() {
    }

    handleOnChangeInput = (event, id) => {
      let copyState = {...this.state}
      copyState[id] = event.target.value;

      this.setState({
        ...copyState,
      })
    }

    checkValidateInput = () => {
      let isValid = true;
      let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
      for (let i = 0; i < arrInput.length; i++) {
        console.log(arrInput[i], this.state[arrInput[i]])
        if(!this.state[arrInput[i]]){
          isValid = false;
          alert('Missing required parameter ' + arrInput[i]);
          break;
        }        
      }
      return isValid
    }

    handleAddNewUser = () => {
      let isValid = this.checkValidateInput();
      if(isValid === true){
        // Call API create modal
        this.props.createNewUser(this.state);
      }
    }

    render() {
        const { isOpen, toggle } = this.props;
        return (
          <Modal
            isOpen={this.props.isOpen}
            toggle={()=>{toggle()}}
            className="modal-user-container"
            size="lg"
          >
            <ModalHeader toggle={toggle}>Create a new user</ModalHeader>
            <ModalBody>
              <div className="container">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label">Email</label>
                    <input 
                      type="text"
                      className="form-control"
                      value={this.state.email}
                      onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                      />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={(event)=>{this.handleOnChangeInput(event, "password")}}
                      />
                  </div>
                  <div className="col-6">
                    <label className="form-label">First name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={this.state.firstName}
                      onChange={(event)=>{this.handleOnChangeInput(event, "firstName")}}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Last name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.lastName}
                      onChange={(event)=>{this.handleOnChangeInput(event, "lastName")}}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input
                      type="text" 
                      className="form-control"
                      value={this.state.address}
                      onChange={(event)=>{this.handleOnChangeInput(event, "address")}}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="px-3" onClick={this.handleAddNewUser}>
                Add new
              </Button>{' '}
              <Button className="px-3" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
