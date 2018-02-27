import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Tabs, Tab } from 'react-materialize'; 
import RedirectCoonectedComp from '../../func/redirection/redirectConnectedConnection';

import ResetPassword from './UserAccounts/ResetPassword';
import ChangeAvatar from './UserAccounts/ChangeAvatar';
import ChangeProfile from './UserAccounts/ChangeProfile';

class UserAccounts extends Component {
    constructor(props){
        super(props);
        this.state= {
            redirect: false
        }
    }
    
    render() { 
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return ( 
            <div>
                <RedirectCoonectedComp />
                <h2>User Accounts</h2>
                <Tabs className='tab-demo z-depth-1'>
                    <Tab title="Test 1" >Test 1</Tab>
                    <Tab title="Change profile informations" active><ChangeProfile/></Tab>
                    <Tab title="Change Image"><ChangeAvatar/></Tab>
                    <Tab title="Reset Password"><ResetPassword/></Tab>
                </Tabs>
            </div>
         )
    }
}
 
export default UserAccounts;