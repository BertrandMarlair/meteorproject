import React, { Component } from 'react';
import { fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Link } from 'react-router-dom';

const styles = {
    fadeIn: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
  }

export default class BadgeSingle extends Component {

    setBadge(){
        this.props.setBadgeForm("add", this.props.badgeSingle);
    }

    render() {
        return (
            <StyleRoot id="cards" onClick={this.setBadge.bind(this)} style={styles.fadeIn}>
                <Link to="/form/">
                    <div className="imageBadge">
                        <img src={this.props.badgeSingle.image} alt="badge"/>
                    </div>
                    <div className="title">
                        <div className="BadgeTitle">{this.props.badgeSingle.name}</div>
                    </div>
                </Link>
            </StyleRoot>
        );
    }
}