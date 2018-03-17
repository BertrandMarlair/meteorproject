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
                <img src="http://www.paristic.fr/14513-large_default/loading.jpg" style={styles.image} alt='logo'/>
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