import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


class OwnProject extends Component {
    handleRemove(e){
        e.preventDefault();
        Meteor.call('project.remove', e.target.id.value, (err)=>{
            if(err){
                Materialize.toast(err.reason, 4000);
            }else{
                Materialize.toast("Correctly delete !", 4000);
            }   
        });
    }

    render() { 
        const project = this.props.project;
        return ( 
            <div id="cardMasonry" className={this.props.display != "masonry" ? "masonryFlex" : ""} style={this.props.display != "masonry" ? {padding: "7px"} : {}} key={project._id}>
                <div className="card">
                    <form className="cardRemove" onSubmit={this.handleRemove.bind(this)}>
                        <input type="hidden" name="id" value={project._id}/>
                        <button style={styles.buttonRight} className="waves-effect waves-light btn btn-floating red" >
                            <i className="material-icons"value={project._id} alt={project._id}>close</i>
                        </button>
                    </form>
                    <div className={this.props.display != "masonry" ? "card-image waves-effect waves-block waves-light imageFlex" : "card-image waves-effect waves-block waves-light"}>
                        <img className="activator" src={project.profile ? project.profile :"http://materializecss.com/images/office.jpg"}/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{project.name}<i className="material-icons right">more_vert</i></span>
                        <p><NavLink to={"/dashboard/" + project._id}>Open project</NavLink></p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
                        <p>{project.desc}</p>
                    </div>
                </div>
            </div>
         )
    }
}
 
export default OwnProject;

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