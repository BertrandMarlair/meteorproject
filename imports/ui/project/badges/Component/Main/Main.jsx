import React, { Component } from 'react';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';
import BadgeCate from '../Badge/BadgeCate';

const styles = {
    fadeIn: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
}

export default class Main extends Component {
    render() {
        return(
            <StyleRoot style={styles.fadeIn}>
                <BadgeCate category={this.props.category}/>
            </StyleRoot>
        )
    }
}