import React, { Component } from 'react';
import RedirectComp from '../../func/redirection/redirectConnection';
import schema from '../../func/formJson/schema/registerFrom';
import uiSchema from '../../func/formJson/ui/registerUi';
import Form from "react-jsonschema-form";
import { Redirect, NavLink } from "react-router-dom";
import GitHubLogin from 'react-github-login';
import Modal from 'react-responsive-modal';


const onSuccess = response => console.log(response);
const onFailure = response => console.log(response);
let userImage = "";

class FormRegister extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect: false,
            openFirstModal: false,
            openSecondModal: false,
            userData: {},
            imageUserConverted: "",
         }
    }

    componentDidMount () {
        const oauthScript = document.createElement("script");
        oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
        document.body.appendChild(oauthScript);
    }

    handleClickGithub(e) {
        e.preventDefault();
        window.OAuth.initialize('bC61PDD354I-jIUUEKr98pCS8lo');
        this.setState({ openSecondModal: true });
        window.OAuth.popup('github').then((provider) => {
            let self = this;
            provider.me().then((data) => {
                let userData = {
                    email: data.email,
                    avatar: data.avatar,
                    alias: data.alias,
                }
                self.setState({userData: userData})
                console.log(this.state.userData);
            });
        });
    }

    handleClickNormal(e){
        e.preventDefault()
        this.setState({ openFirstModal: true });
    }

    onCloseFirstModal(){
        this.setState({ openFirstModal: false });
    };

    onCloseSecondModal(){
        this.setState({ openSecondModal: false });
    };
      
    onSubmitGithub(e){
        e.preventDefault();
        if(this.state.userData.email != ""){
            if(e.target.first_name.value != "" && e.target.last_name.value != "" && e.target.promotion.value != ""){
                if(e.target.password.value === e.target.passwordConfirm.value && e.target.password.value != "" && e.target.passwordConfirm.value != "" ){
                    let accountInfo = {
                        email: this.state.userData.email,
                        password: e.target.password.value,
                        profile: {
                            username: e.target.first_name.value,
                            lastname: e.target.last_name.value,
                            profession: "Student",
                            avatar: this.state.userData.avatar,
                            promotion: e.target.promotion.value,
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
                Materialize.toast("Complete the form", 4000);
            }
        }else{
            Materialize.toast("We can't acces to your mail from GitHub", 4000);
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

    githubModal(){
        if(this.state.userData.email){
            let user = this.state.userData;
            return(
                <div className="modalRegister">
                    <div className="imageGithub">
                        <img src={user.avatar} alt="avatar" />
                    </div>
                    <div className="userGithub">
                        <span className="emailGithub">
                            email: {user.email}
                        </span>
                        <span className="aliasGithub">
                            alias: {user.alias}
                        </span>
                    </div>
                    <div className="formRegister">
                        <div className="row">
                            <form className="col s12" onSubmit={this.onSubmitGithub.bind(this)}>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input id="first_name" name="first_name" type="text" className="validate"/>
                                        <label htmlFor="first_name">First Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="last_name" name="last_name" type="text" className="validate"/>
                                        <label htmlFor="last_name">Last Name</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="password" name="password" type="password" className="validate"/>
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="passwordConfirm" name="passwordConfirm" type="password" className="validate"/>
                                        <label htmlFor="passwordConfirm">Confirm Password</label>
                                    </div>
                                </div>
                                <label htmlFor="promotion">Promotion</label>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <select id="promotion" name="promotion">
                                            <optgroup label="Bruxelles">
                                                <option value="Lovelace">Lovelace</option>
                                                <option value="Cycorp">Cycorp</option>
                                                <option value="Hamilton">Hamilton</option>
                                                <option value="Swartz">Swartz</option>
                                            </optgroup>
                                            <optgroup label="Charleroi">
                                                <option value="Turing">Turing</option>
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="modalRegister">
                    <div className="modalRegisterSpinner">
                        <div className="preloader-wrapper spinnerModalRagister big active">
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    onError(errors){
        Materialize.toast("You have " + errors.length + " errors to fix", 4000);
    };

    git(e){
        e.preventDefault();
        window.open('https://github.com/login/oauth/authorize?client_id=0fcee618713b897bdfd8&scopes=scopes&state=unguessable-string');
    }

    render() { 
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return ( 
            <div style={styles.register}>
                <RedirectComp />
                <h2>Register Accounts</h2>
                <div className="row boxRow registerForm">
                    <div className="registerLink">
                        <a href="" onClick={this.handleClickGithub.bind(this)} className="btn btn-social btn-github">
                            <span className="fa fa-github"></span> Sign in with Github
                        </a>
                    </div>
                    {/* <div className="registerLink">
                        <a href="" onClick={this.handleClickNormal.bind(this)} className="btn btn-social btn-github">
                            <span className="fa fa-github"></span> Normal Sign
                        </a>
                    </div> */}
                    <Modal open={this.state.openFirstModal} onClose={this.onCloseFirstModal.bind(this)} little>
                        <Form 
                            schema={schema}
                            uiSchema={uiSchema}
                            onSubmit={this.onSubmit.bind(this)}
                            onError={this.onError.bind(this)}
                        />
                    </Modal>
                    <Modal open={this.state.openSecondModal} onClose={this.onCloseSecondModal.bind(this)} little>
                        {this.githubModal()}
                    </Modal>
                </div>
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