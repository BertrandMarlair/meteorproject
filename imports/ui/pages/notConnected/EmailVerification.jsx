import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logged from '../../func/login';

class EmailVerificationToken extends Component {
    redirect(){
        if(!Logged('CONNECT')){
            return <Redirect to='' />
        }
    }

    render() { 
        return ( 
            <div id="main">
                <div className="emailVerify">
                    {this.redirect}
                    <h2>Verify mail !</h2>
                    Please verified your Email before accessing to this page !

                    Go on your account mail and click on the link below or copy paste the link on your navigator.
                </div>
            </div>
         )
    }
}
 
export default EmailVerificationToken;
