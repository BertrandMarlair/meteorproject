import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Link } from 'react-router-dom';

const styles = {
    fadeInDown: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    }
}

export default class Notfound extends Component {
    render() {
        return (
            <StyleRoot>
                <div className="succeed" style={styles.fadeInDown}>
                   <div className="imgCate">
                        <img src={require("../Form/image/notfound/notfound.png")} style={styles.img} alt="category"/>
                    </div>
                    <p className="message">
                        The page you are looking for doesn't exist
                    </p>
                    <Link to="/">
                        <a className="waves-effect waves-light btn"> Back Home </a>
                    </Link>
                </div>
            </StyleRoot>
        );
    }
}