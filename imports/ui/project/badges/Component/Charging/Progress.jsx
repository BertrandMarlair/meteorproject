import React, { Component } from 'react';

    const styles = {
        image: {
            margin: "auto",
            width: "50%",
            display: "block"
        }
    }

export default class Progress extends Component {
    render() {
        return (
            <div className="mainProcess">
                <img src="https://cdn.dribbble.com/users/140957/screenshots/2533654/loading-animation.gif" style={styles.image} alt='logo'/>
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