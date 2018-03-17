import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Redirect, Link } from 'react-router-dom';

const styles = {
    fadeInDown: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    }
}

export default class Succeed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    componentWillMount(){
        if(!this.props.already){
            this.setState({redirect: true})
        }
    }

    componentWillUnmount(){
        this.props.setSucceed("delete")
    }

    redirect(){
        if(this.state.redirect){
            return(
                <Redirect to="/" />
            )
        }
    }

    render() {
        return (
            <StyleRoot>
                {this.redirect()}
                <div className="already" style={styles.fadeInDown}>
                    Already Claim
                   <div className="imgCate">
                        <img src={require("../Form/image/succeed/already.png")} style={styles.img} alt="already"/>
                    </div>
                    <p className="message">
                        {this.props.message}
                    </p>
                    <Link to="/">
                        <button className="waves-effect waves-light btn">Return Home</button>
                    </Link>
                </div>
            </StyleRoot>
        );
    }
}