import React, { Component } from 'react';
import axios from 'axios';

const config = {
    oauth_client_id: "33450c8d38b3d7775951",
    oauth_client_secret: "cb757513bea2396f8e0bf7ef2a3958988af3ad8a",
}

class Callback extends Component {

    componentDidMount(){
        var urlCode = new URL(window.location.href).searchParams.get('code');
        this.authenticate(urlCode)
    }

    authenticate(code) {
        var data = {
            client_id: config.oauth_client_id, //your GitHub client_id
            client_secret: config.oauth_client_secret,  //and secret
           code: code   //the access code we parsed earlier
        };
    
        var reqOptions = {
            host: 'github.com',
            port: '443',
            path: '/login/oauth/access_token',
            method: 'POST',
            headers: { 'content-length': data.length }
        };
    
        var body = '';
        
        const req = new XMLHttpRequest();

        req.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    console.log("Réponse reçue: %s", this.responseText);
                } else {
                    console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
                }
            }
        };

        axios.post('https://github.com/login/oauth/access_token?client_id='+ data.client_id+'&client_secret='+data.client_secret+'&code='+ data.code,{header:{
            "cache-control":"no-cache",
            "content-type":"text/html; charset=utf-8"
        }})
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log({error: error})
        })

        // console.log('https://github.com/login/oauth/access_token?client_id='+ data.client_id+'&client_secret='+data.client_secret+'&code='+ data.code)
        // req.open('POST', 'https://github.com/login/oauth/access_token?client_id='+ data.client_id+'&client_secret='+data.client_secret+'&code=6dbbd7b44b3ba04a381c', true);
        // req.send(null);
        
        // var req = https.request(reqOptions, function(res) {
        //     res.setEncoding('utf8');
        //     res.on('data', function (chunk) { body += chunk; });
        //     res.on('end', function() {
        //         cb(null, qs.parse(body).access_token);
        //     });
        // });
    
        // req.write(data);
        // req.end();
        // req.on('error', function(e) { console.log(e.message); });

        
    }

    render() { 
        console.log(this.props.match)
        return ( 
            <div>
                callback
            </div>
         )
    }
}
 
export default Callback;