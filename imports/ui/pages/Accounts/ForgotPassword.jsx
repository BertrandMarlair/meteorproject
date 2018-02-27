import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RedirectComp from '../../func/redirection/redirectConnection';
import Form from "react-jsonschema-form";
import schema from '../../func/formJson/schema/forgotForm';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect: false,
         }
    }

    sendForgotPassword({formData}){
        console.log(formData.email)
        const option = {
            email: formData.email
        }
        Accounts.forgotPassword(option, function(err){
            if (err) {
                Materialize.toast(err.reason, 4000);
            } else {
                Materialize.toast("A email was send to your mail accounts, please folow the link below", 4000);
            }
        });
    }

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
                <h2>Forget Password</h2>
                <div className="row">
                    <Form 
                        schema={schema}
                        onSubmit={this.sendForgotPassword.bind(this)}
                        onError={this.onError.bind(this)}
                    />
                </div>
            </div>
         )
    }
}
 
export default ForgotPassword;

const styles = {
    register:{
        maxWidth: "800px",
        margin: "auto"
    }
}