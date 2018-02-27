import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import RedirectComp from '../../func/redirection/redirectConnection';
import Form from "react-jsonschema-form";
import schema from '../../func/formJson/schema/loginForm';
import uiSchema from '../../func/formJson/ui/loginUi';

class FormLogin extends Component {
    constructor(props){
        super(props);
        this.state= {
            redirect: false
        }
    }

    onSubmit({formData}){
        if(formData){
            if(formData.password != ""){
                Meteor.loginWithPassword(formData.email, formData.password, (err)=>{
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast("Account authetifited !", 4000);
                        this.setState({redirect: true});
                    }
                });
            }else{
                Materialize.toast("Your password don't match !", 4000);
            }
        }
    };

    onError(errors){
        Materialize.toast("You have " + errors.length + " errors to fix", 4000);
    };

    render() { 
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return ( 
            <div style={styles.register}>
                <RedirectComp />
                <h2>Login Accounts</h2>
                <div className="row">
                    <Form 
                        schema={schema}
                        uiSchema={uiSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        onError={this.onError.bind(this)}
                    />
                </div>
                <NavLink activeClassName="active" to="/register">You haven't a accounts</NavLink><br/>
                <NavLink activeClassName="active" to="/forgotpassword">Forgot password</NavLink>
            </div>
         )
    }
}
 
export default FormLogin;

const styles = {
    register:{
        maxWidth: "800px",
        margin: "auto"
    }
}