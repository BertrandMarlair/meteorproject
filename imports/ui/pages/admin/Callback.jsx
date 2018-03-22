import React, { Component } from 'react';
import axios from 'axios';

class Callback extends Component {

    componentDidMount () {
        const oauthScript = document.createElement("script");
        oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";
    
        document.body.appendChild(oauthScript);
      }

      handleClick(e) {
        // Prevents page reload
        e.preventDefault();
    
        // Initializes OAuth.io with API key
        // Sign-up an account to get one
        window.OAuth.initialize('bC61PDD354I-jIUUEKr98pCS8lo');
    
        // Popup Github and ask for authorization
        window.OAuth.popup('github').then((provider) => {
    
          // Prompts 'welcome' message with User's name on successful login
          // Check console logs for additional User info
          provider.me().then((data) => {
            console.log("data: ", data);
            alert("Welcome " + data.name + "!");
          });
    
          // You can also call Github's API using .get()
          provider.get('/user').then((data) => {
             console.log('self data:', data);
          });
    
        });
      }

    render() { 
        return ( 
            <div>
                <a href="" onClick={this.handleClick.bind(this)} className="btn btn-social btn-github">
             <span className="fa fa-github"></span> Sign in with Github
           </a>
            </div>
         )
    }
}
 
export default Callback;