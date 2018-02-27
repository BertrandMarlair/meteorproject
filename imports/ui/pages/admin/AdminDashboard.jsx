import React, { Component } from 'react';
import AdminRedirectCoonectedComp from '../../func/redirection/adminRedirectConnectedConnection';
import { withTracker } from 'meteor/react-meteor-data';
import { Tabs, Tab } from 'react-materialize'; 

import User from './AdminAccounts/UserComponent'
import FormSelect from './AdminAccounts/FormSelect';

const Users = Meteor.users.find();

class AdminDashboard extends Component {
    changeRole(id, data, index){
        let newProfile = this.props.users[index].profile;
        newProfile.role = data;
        Meteor.users.update({_id : id},{$set:{profile : newProfile}}, (err) => {
            if(err){
                Materialize.toast(err.reason, 4000);
            }else{
                Materialize.toast("Role Update !", 4000);
            }
        });
    }

    remove(id){
        Meteor.users.remove({_id : id}, (err) => {
            if(err){
                Materialize.toast(err.reason, 4000);
            }else{
                Materialize.toast("User remove !", 4000);
            }
        }); 
    }

    getUsers() {
        return this.props.users.map((user, index) => {
            return (
                <User
                    key={user._id}
                    id={user._id}
                    index={index}
                    user={user.emails[0].address}
                    profile={user.profile}
                    changeRole={this.changeRole.bind(this)}
                    remove={this.remove.bind(this)}
                />
            );
        });
    }

    render() {
        if(Meteor.userId()){
            return (
                <div>
                    <AdminRedirectCoonectedComp />
                    <ul id="tabs-swipe-demo" className="tabs">
                        <li className="tab col s3"><a className="active" href="#test-swipe-1">Gestion Form</a></li>
                        <li className="tab col s3"><a href="#test-swipe-2">Gestion Users</a></li>
                        <li className="tab col s3"><a href="#test-swipe-3">Test 3</a></li>
                    </ul>
                    <div id="test-swipe-1" className="col s12"><FormSelect/></div>
                    <div id="test-swipe-2" className="col s12">{this.getUsers()}</div>
                    <div id="test-swipe-3" className="col s12">Test 3</div>
                </div>
            );
        }else{
            return(
                <div>
                    Loading
                </div>
            )
        }
    }
}
    
export default withTracker(props => {
    if(Meteor.user()){
        Meteor.subscribe('allUsers', Meteor.user().profile.role);
        return {
            users: Meteor.users.find({}).fetch(),
        };
    }else{
        Meteor.subscribe('allUsers');
        return {
            users: Meteor.users.find({_id : Meteor.userId()}).fetch()
        };
    }
})(AdminDashboard);