import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class AdminRedirectConnectedComp extends Component {
    redirect(){
        if(!Meteor.userId()){
            return <Redirect to='' />
        }else if(Meteor.userId() && Meteor.user()){
            if(Meteor.user().emails[0].verified === false){
                return <Redirect to='/verifiedEmail' />
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