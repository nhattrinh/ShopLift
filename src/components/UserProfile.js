import React, { Component } from 'react';
import UserCard from './UserCard';
import { Button, Fade } from 'reactstrap';

import "../App.css";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = { fadeIn: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      fadeIn: true
    });
  }

  render() {
    return (
      <div>
        <Button outline color="success my-sm-0" onClick={this.toggle}>GET THE DISCOUNT CODE</Button>
          <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
            raccoon123
          </Fade>
          <div className='user-profile'>
            <UserCard addToCart={this.props.addToCart} getUser={this.props.getUser}/>
        </div>
        </div>
        );
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }
};
