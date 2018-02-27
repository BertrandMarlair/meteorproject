import React, { Component } from 'react';

class ResetPassword extends Component {
    onSubmit(e){
        e.preventDefault();
        let element = $(e.target);
        
        let password = element.find("#password").val();
        let confirmpassword = element.find("#confirmpassword").val();
        let newpassword = element.find("#newpassword").val();
        
        if(password === confirmpassword && password !== "" && confirmpassword !== "" && newpassword !== ""){
            Accounts.changePassword(password, newpassword, (err) => {
                if(err){
                    Materialize.toast(err.reason, 4000);
                }else{
                    Materialize.toast("Password changed !", 4000);
                    this.setState({redirect: true})
                }
            })
        }else{
            Materialize.toast("Your password don't match !", 4000);
        }
    }
    
    render() { 
        return ( 
            <div id="main" className="row"  style={styles.register}>
                <h3>Reset your password :</h3>
                <form className="col s12" onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input id="password" type="password" className="validate" autoComplete="current-password" name="password"/>
                            <label htmlFor="password">Old password</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input id="confirmpassword" type="password" className="validate" autoComplete="current-password"name="confirmpassword"/>
                            <label htmlFor="confirmpassword">Confirm Password</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input id="newpassword" type="password" className="validate" autoComplete="current-password"name="newpassword"/>
                            <label htmlFor="newpassword">New Password</label>
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </div>
                </form>
            </div> 
        )
    }
}
 
export default ResetPassword;

const styles = {
    register:{
        maxWidth: "800px",
        margin: "auto"
    }
}