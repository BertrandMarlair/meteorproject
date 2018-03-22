import React, { Component } from 'react';
import RedirectComp from '../../func/redirection/redirectConnection';
import schema from '../../func/formJson/schema/registerFrom';
import uiSchema from '../../func/formJson/ui/registerUi';
import Form from "react-jsonschema-form";
import { Redirect, NavLink } from "react-router-dom";
import GitHubLogin from 'react-github-login';

const onSuccess = response => console.log(response);
const onFailure = response => console.log(response);

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect: false,
         }
    }

    onSubmit({formData}){
        if(formData){
            if(formData.selectWidgetOptions != ""){
                if(formData.password === formData.confirmPassword && formData.password != "" && formData.confirmPassword != "" ){
                    let accountInfo = {
                        email: formData.email,
                        password: formData.password,
                        profile: {
                            username: formData.firstName,
                            lastname: formData.lastName,
                            profession: formData.selectWidgetOptions,
                            role: "student"
                        }
                    }
                    Accounts.createUser(accountInfo, (err) => {
                        if(err){
                            Materialize.toast(err.reason, 4000);
                        }else{
                            Materialize.toast("Account created !", 4000);
                            this.setState({ redirect: true })
                        }
                    })
                }else{
                    Materialize.toast("Your password don't match !", 4000);
                }
            }else{
                Materialize.toast("Select a profession", 4000);
            }
        }
    };

    onError(errors){
        Materialize.toast("You have " + errors.length + " errors to fix", 4000);
    };

    git(e){
        e.preventDefault();
        window.open('https://github.com/login/oauth/authorize?client_id=33450c8d38b3d7775951&scopes=scopes&state=unguessable-string');
    }

    render() { 
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return ( 
            <div style={styles.register}>
                <RedirectComp />
                <h2>Register Accounts</h2>
                <div className="row boxRow">
                    <Form 
                        schema={schema}
                        uiSchema={uiSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        onError={this.onError.bind(this)}
                    />
                </div>
                <form onSubmit={this.git.bind(this)}>
                    <button>GitHubLogin</button>
                </form>
                <NavLink activeClassName="active" to="/login">You already got a accounts</NavLink>
            </div>
         )
    }
}
 
export default FormRegister;

const styles = {
    register:{
        maxWidth: "800px",
        margin: "auto"
    }
}