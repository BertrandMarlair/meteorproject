import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Logged from '../login';

export default class AdminRedirectCoonectedComp extends Component {
    redirect(){
        if(!Meteor.userId()){
            return <Redirect to='' />
        }else if(Meteor.userId() && Meteor.user()){
            if(Meteor.user().emails[0].verified === false){
                return <Redirect to='/verifiedEmail' />
            }else if(Meteor.user().profile.role != 'admin'){
                return <Redirect to='' />
            }
        }
    }

    render() { 
        return (
            <div>
                {this.redirect()}
            </div>
        )
    }
}