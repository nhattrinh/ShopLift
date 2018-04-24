import React, {Component} from 'react';

import '../../App.css';

export default class Step3 extends Component{
    constructor(props) {
    super(props);

    this.state = {
      firstname: props.getStore().firstname,
      lastname: props.getStore().lastname,
      address: props.getStore().address,
      city: props.getStore().city,
      state: props.getStore().state,
      zipcode: props.getStore().zipcode
    };

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

  }


  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (this.props.getStore().firstname != userInput.firstname || 
            this.props.getStore().lastname != userInput.lastname ||
            this.props.getStore().address != userInput.address || 
            this.props.getStore().city != userInput.city ||
            this.props.getStore().state != userInput.state ||
            this.props.getStore().zipcode != userInput.zipcode) 
            { // only update store of something changed
            this.props.updateStore({
            ...userInput,
            // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)
        }

        isDataValid = true;
    }
    else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    }

    return isDataValid;
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
  }

   _validateData(data) {
    return  {
      firstnameVal: (data.firstname != 0), // required: anything besides N/A
      lastnameVal: (data.lastname != 0),
      addressVal: (data.address != 0),
      cityVal: (data.city != 0),
      stateVal: (data.state != 0),
      zipcodeVal: (data.zipcode != 0)

    }
  }

  _validationErrors(val) {
    const errMsgs = {
      firstnameValMsg: val.firstnameVal ? '' : 'A first name is required',
      lastnameValMsg: val.lastnameVal ? '' : 'A last name email is required',
      addressValMsg: val.addressVal ? '' : 'An address is required',
      cityValMsg: val.cityVal ? '' : 'A city  is required',
      stateValMsg: val.stateVal ? '' : 'A state is required',
      zipcodeValMsg: val.zipcodeVal ? '' : 'A zipcode is required',



    }
    return errMsgs;
  }

  _grabUserInput() {
    return {
      firstname: this.refs.firstname.value,
      lastname: this.refs.lastname.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      state: this.refs.state.value,
      zipcode: this.refs.zipcode.value
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

    render(){

      let notValidClasses = {};

    if (typeof this.state.firstnameVal == 'undefined' || this.state.firstnameVal) {
      notValidClasses.firstnameCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.firstnameCls = 'has-error col-md-8';
       notValidClasses.firstnameValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.lastnameVal == 'undefined' || this.state.lastnameVal) {
        notValidClasses.lastnameCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.lastnameCls = 'has-error col-md-8';
       notValidClasses.lastnameValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.addressVal == 'undefined' || this.state.addressVal) {
        notValidClasses.addressCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.addressCls = 'has-error col-md-8';
       notValidClasses.addressValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.cityVal == 'undefined' || this.state.cityVal) {
        notValidClasses.cityCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.cityCls = 'has-error col-md-8';
       notValidClasses.cityValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.stateVal == 'undefined' || this.state.stateVal) {
        notValidClasses.stateCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.stateCls = 'has-error col-md-8';
       notValidClasses.stateValGrpCls = 'val-err-tooltip';
    }

    if (typeof this.state.zipcodeVal == 'undefined' || this.state.zipcodeVal) {
        notValidClasses.zipcodeCls = 'no-error col-md-8';
    }
    else {
       notValidClasses.zipcodeCls = 'has-error col-md-8';
       notValidClasses.zipcodeValGrpCls = 'val-err-tooltip';
    }
        return(
          <div>
              <div className = "cart">
                <a href="/shop"> 
                  <span class="glyphicon glyphicon-chevron-left"></span> 
                  Continue Shopping
                </a>
                <h1> Shipping Information </h1>
              </div>
                
              <div className="info">
              <form>
                <div class="firstname">
                 <label> FIRST NAME: </label>
                  <input 
                  ref="firstname"
                  type="text"
                  required
                  defaultValue={this.state.firstname}
                  onBlur={this.validationCheck}
                  placeholder="First Name"/>
                </div>

                <div class="lastname">
                 <label> LAST NAME: </label>
                  <input
                  ref="lastname"
                  type="text"
                  required
                  defaultValue={this.state.lastname}
                  onBlur={this.validationCheck}
                  placeholder="Last Name"/>
                </div>

                <div class = "address">
                  <label> ADDRESS: </label>
                  <input
                    ref="address"
                    type="text"
                    required
                    defaultValue={this.state.address}
                    onBlur={this.validationCheck}
                    placeholder="Address"
                    />
                </div>

                <div class = "city" >
                  <label> CITY: </label>
                  <input
                  ref="city"
                  type="text"
                  required
                  defaultValue={this.state.city}
                  onBlur={this.validationCheck}
                  placeholder="City"
                  />
                </div>

                <div class = "state">
                  <label> STATE: </label>
                  <input
                  ref="state"
                  type="text"
                  required
                  defaultValue={this.state.state}
                  onBlur={this.validationCheck}
                  placeholder="State"
                  />
                </div>

                <div class = "zipcode">
                  <label> ZIP CODE: </label>
                  <input
                  ref="zipcode"
                  type="text"
                  required
                  defaultValue={this.state.zipcode}
                  onBlur={this.validationCheck}
                  placeholder="Zip Code"
                  />
                </div>
              </form>
              </div>
              
             



        </div>
        );
    }
}
