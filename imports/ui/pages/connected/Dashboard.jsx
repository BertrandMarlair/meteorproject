import React, { Component } from 'react';
import RedirectCoonectedComp from '../../func/redirection/redirectConnectedConnection';
import Modal from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Project } from '../../../api/ProjectCollections';

import OwnProject from './Dashboard/OwnProject';
import CollegueProject from './Dashboard/CollegueProject';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openFirstModal: false,
            openSecondModal: false,
            userSlected: [],
         }
    }

    componentWillUnmount(){
        this.setState({userSlected: []})
    }

    handleSubmit(e){
        e.preventDefault();
        if(e.target.projectName.value && e.target.projectDescription.value){
            let name = e.target.projectName.value;
            let desc = e.target.projectDescription.value;
            let owner = Meteor.userId();
            let collegue = this.state.userSlected;
            Meteor.call('project.insert', name, desc, owner, collegue, (err)=>{
                if(err){
                    Materialize.toast(err.reason, 4000);
                }else{
                    Materialize.toast("Correctly send !", 4000);
                    this.setState({ openFirstModal: false });
                    this.setState({ openSecondModal: false });
                    this.setState({userSlected : ""})
                }   
            });
            e.target.reset();
        }else{
          Materialize.toast("Complete de form correctly !", 4000);
        }
    }

    handleUser(e){
        e.preventDefault();
        var inputs = document.querySelectorAll("input[type='checkbox']");
        user = [];
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].checked === true){
                user.push(inputs[i].id)
            };   
        }
        this.setState({userSlected: user, openSecondModal: false});
    }

    onOpenFirstModal(){
        this.setState({ openFirstModal: true });
    };
    
      onCloseFirstModal(){
        this.setState({ openFirstModal: false });
    };
    
      onOpenSecondModal(){
        this.setState({ openSecondModal: true });
    };
    
      onCloseSecondModal(){
        this.setState({ openSecondModal: false });
    };

    render() { 
        const userNbr = this.state.userSlected.length;
        const { openFirstModal, openSecondModal } = this.state;
        return ( 
            <div>
                <RedirectCoonectedComp />
                <div className="own">
                    <h3>Dashboard</h3>
                    <div className="wrapper">
                        <div className={(this.props.project.length >= 7) ? "masonry" : "masonryFlexCard"}>
                            {this.props.project.map((project) => {
                                let display = "";
                                if(this.props.project.length >= 7){
                                    display = "masonry";
                                }
                                return(
                                    <OwnProject key={project._id} project={project} display={display} />
                                )
                            })}
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="collegue">
                    <h3>Project from collegue : </h3>
                    <div className="wrapper">
                        <div className={(this.props.collegue.length >= 7) ? "masonry" : "masonryFlexCard"}>
                            {this.props.collegue.map((collegue) => {
                                let display = "";
                                if(this.props.collegue.length >= 7){
                                    display = "masonry";
                                }
                                return(
                                    <CollegueProject key={collegue._id} collegue={collegue} display={display} />)
                                })
                            }
                        </div>
                    </div>
                </div>
                <button onClick={this.onOpenFirstModal.bind(this)} id="menu" style={styles.button} className="waves-effect waves-light btn btn-floating" ><i className="material-icons">add</i></button>
                <Modal open={openFirstModal} onClose={this.onCloseFirstModal.bind(this)} little>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">widgets</i>
                                <input id="projectName" type="text" className="validate" name="projectName"/>
                                <label htmlFor="projectName">Project Name</label>
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">description</i>
                                <textarea id="projectDescription" className="materialize-textarea" name="projectDescription"></textarea>
                                <label htmlFor="projectDescription">Project Description</label>
                            </div>
                            <a className="btn btn-action" onClick={this.onOpenSecondModal.bind(this)}>
                                Open second modal
                            </a>
                            <div>User selected : {userNbr}</div>
                            <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                        </div>
                    </form>
                </Modal>
                <Modal open={openSecondModal} onClose={this.onCloseSecondModal.bind(this)} little>
                    <div className="row">
                        <form className="col s12" style={styles.formUser} onSubmit={this.handleUser.bind(this)}>
                            <div className="row">
                                {this.props.users.map((user) => {
                                    this.id = false;
                                    for(let i = 0; this.state.userSlected.length > i; i++){
                                        if(this.state.userSlected[i] == user._id){
                                            this.id = true
                                        }
                                    }
                                    if(this.id){
                                        return(
                                            <p key={user._id}>
                                                <input type="checkbox" id={user._id} defaultChecked />
                                                <label htmlFor={user._id}>
                                                    {user.profile.username} {user.profile.lastname}
                                                </label>
                                            </p>
                                        )
                                    }else{
                                        return(
                                            <p key={user._id}>
                                                <input type="checkbox" id={user._id}/>
                                                <label htmlFor={user._id}>
                                                    {user.profile.username} {user.profile.lastname}
                                                </label>
                                            </p>
                                        )
                                    }
                                })}
                                <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
         )
    }
}
 
export default withTracker(props => {
    Meteor.subscribe('project');
    Meteor.subscribe('users');
    return {
        project: Project.find({ owner: Meteor.userId()}).fetch(),
        users: Meteor.users.find({ _id : { $ne : Meteor.userId() } } ).fetch(),
        collegue: Project.find({ collegue: { $in: [Meteor.userId()] } }).fetch(),
    };
})(Dashboard);

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
    }
}