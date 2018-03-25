import React, { Component } from 'react';

export default class Progress extends Component {
    render() {
        return (
            <div className="mainProcess">
                <div className="loader-wrapper">
                    <div className="loader">
                        <div className="roller"></div>
                        <div className="roller"></div>
                    </div>
                    <div id="loader2" className="loader">
                        <div className="roller"></div>
                        <div className="roller"></div>
                    </div>
                    
                    <div id="loader3" className="loader">
                        <div className="roller"></div>
                        <div className="roller"></div>
                    </div>
                </div>
            </div>
        );
    }
}