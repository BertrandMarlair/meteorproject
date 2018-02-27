import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Project } from '../../../../api/ProjectCollections';

class CollegueProject extends Component {
    render() { 
        return ( 
            <div>
                <div className="row">
                    test
                </div>
            </div>
         )
    }
}
 
export default CollegueProject;

const styles={
    button:{
        right: "25px",
        bottom: "40px",
        position: "fixed",
        width: "50px",
        height: "50px",
        lineHeight: "65px",
    },
    buttonRight:{
        lineHeight: "20px",
        float: "right",
        margin: "10px",
    },
    formUser:{
        marginTop: "40px",
        marginBottom: "40px",
        width: "400px",
    }
}