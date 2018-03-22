import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
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
                <h4>User Accounts</h4>
                <Tabs>
                    <Tab label="Profile"><ChangeProfile/></Tab>
                    <Tab label="Image"><ChangeAvatar/></Tab>
                    <Tab label="Password"><ResetPassword/></Tab>
                </Tabs>
            </div>
         )
    }
}
 
export default UserAccounts;