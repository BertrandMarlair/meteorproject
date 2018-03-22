import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Form from 'react-jsonschema-form';
import Logged from '../../../func/login';

import schema from '../../../func/formJson/schema/profileForm';
import uiSchema from '../../../func/formJson/ui/profileUi';

class ChangeProfile extends Component {
    onSubmit(e){
        e.preventDefault();
        let element = $(e.target);
        
        let firstname = element.find("#firstName").val();
        let lastname = element.find("#Lastname").val();
        let profession = element.find("#profession").val();
        if(firstname == "" && lastname == "" && profession == ""){
            Materialize.toast("Please input at least one information !", 4000);
        }else{
            if(this.props.users){
                let newProfile = {
                    username: firstname ? firstname : Logged('NAME'),
                    lastname: lastname ? lastname : Logged('LASTNAME'),
                    profession: profession ? profession : Logged('PROFESSION'),
                    role: Logged('ROLE'),
                    avatar: Logged('USER_IMAGE'),
                    background: Logged('BACKGROUND_IMAGE'),
                }
                Meteor.users.update({_id : this.props.users[0]._id},{$set:{profile : newProfile}}, (err) => {
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        document.getElementById('changeProfile').reset();
                        Materialize.toast("Account been Change !", 4000);
                    }
                })
            }
        }
    };

    onError(errors){
        Materialize.toast("You have " + errors.length + " errors to fix", 4000);
    };
       
    render() {
        if(Logged('CONNECT')){
            return(
                <div id="main" className="row">
                    <h5>Change your Profile :</h5>
                    <form id="changeProfile" className="col s12" onSubmit={this.onSubmit.bind(this)}>
                        <div className="row">
                            <div>Username : {Logged('NAME')}</div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">supervisor_account</i>
                                <input id="firstName" type="text" className="validate" name="firstName"/>
                                <label htmlFor="firstName">firstName</label>
                            </div>
                            <div>Lastname : {Logged('LASTNAME')}</div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">supervisor_account</i>
                                <input id="Lastname" type="text" className="validate" name="Lastname"/>
                                <label htmlFor="Lastname">Lastname</label>
                            </div>
                            <div>Profession : {Logged('PROFESSION')}</div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">supervisor_account</i>
                                <input id="profession" type="text" className="validate" name="profession"/>
                                <label htmlFor="profession">Profession</label>
                            </div>
                            <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                        </div>
                    </form>
                </div>
            )
        }else{
            return (<div>Chrging</div>)
        }
    }
}
 
export default withTracker(props => {
    Meteor.subscribe('connectedUser');
    return {
        users: Meteor.users.find({}).fetch()
    };
})(ChangeProfile);