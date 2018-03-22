import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Project } from '../../../../api/ProjectCollections';
import { Collegue } from '../../../../api/CollegueTest';
import Modal from 'react-responsive-modal';
import RedirectCoonectedComp from '../../../func/redirection/redirectConnectedConnection';

import InfiniteCalendar from 'react-infinite-calendar';

import OneProjectComments from './OneProject/OneProjectComments';
import OneProjectOrganisation from './OneProject/OneProjectOrganisation';

class OneProject extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            openFirstModal: false,
            collegue: []
         }
    }

    handleUser(e){
        e.preventDefault();
        var inputs = document.querySelectorAll("input[type='checkbox']");
        collegue = [];
        for(var i = 0; i < inputs.length; i++) {
            if(inputs[i].checked === true){
                collegue.push(inputs[i].className)
            };   
        }
        Meteor.call('project.updateCollegue', this.props.match.params.id, collegue, (err)=>{
            if(err){
                Materialize.toast(err.reason, 4000);
            }else{
                Materialize.toast("Correctly send !", 4000);
            }   
        });
    }

    onOpenFirstModal(){
        this.setState({ openFirstModal: true });
    };
    
      onCloseFirstModal(){
        this.setState({ openFirstModal: false });
    };

    componentDidUpdate(){
        const project = this.props.projectOne[0];
        const users = this.props.users;
        var inputs = document.querySelectorAll("input[type='checkbox']");
        for(var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false
        }
        if(users && project){
            users.map((user) => {
                this.id = false;
                for(let i = 0; project.collegue.length > i; i++){
                    if(project.collegue[i] == user._id){
                        this.id = true
                    }
                }
                let userInput = document.getElementsByClassName(user._id)[0];
                if(userInput){    
                    if(this.id){
                        userInput.checked = true;
                    }else{
                        userInput.checked = false;
                    }
                }
            })
        }
    }

    owner(type){
        if(Meteor.userId() === this.props.projectOne[0].owner){
            if(type == 'form'){
                return(
                    <form className="col s12" style={styles.formUser} onSubmit={this.handleUser.bind(this)}>
                        <div style={styles.formInput}>
                            {this.props.users.map((user, index) => {
                                return(
                                    <p key={index}>
                                        <input type="checkbox" id={index} className={user._id}/>
                                        <label htmlFor={index}>
                                            {user.profile.username} {user.profile.lastname}
                                        </label>
                                    </p>
                                )}
                            )}
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </form>
                )
            }else if(type == 'openModal'){
                return(
                    <a className="btn-floating halfway-fab waves-effect waves-light" style={styles.edit} onClick={this.onOpenFirstModal.bind(this)}><i className="material-icons">edit</i></a>
                )
            }else if(type == 'modal'){
                return(
                    <Modal open={this.state.openFirstModal} onClose={this.onCloseFirstModal.bind(this)} little>
                        <form onSubmit={this.test.bind(this)}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">title</i>
                                    <textarea id="title" className="materialize-textarea" name="title" defaultValue={this.props.projectOne[0] ? this.props.projectOne[0].name: ""}></textarea>
                                    <label htmlFor="title">Change Title</label>
                                </div>
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">description</i>
                                    <textarea id="description" className="materialize-textarea" name="description" defaultValue={this.props.projectOne[0] ? this.props.projectOne[0].desc: ""} ></textarea>
                                    <label htmlFor="description">Change Description</label>
                                </div>
                                <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                            </div>
                        </form>
                        {this.owner('form')}
                        {this.imageChange()}
                    </Modal>  
                )
            }
        }
    }

    imageChange(){
        return(
            <div>
                <h3>Changer your Avatar :</h3>
                <form onSubmit={this.avatarSubmit.bind(this)}> 
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input type="file" name="AvatarInput" style={{height: "50px"}} />
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </div>
                </form>
                <hr/>
                <h3>Changer your Background :</h3>
                <form onSubmit={this.backgroundSubmit.bind(this)}> 
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input type="file" name="BackgroundInput" style={{height: "50px"}} />
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    avatarSubmit(e){
        e.preventDefault();
        let image = e.target.AvatarInput.files[0];
        if(image.size < 10485760){
            let FR = new FileReader();
            FR.onload = (data) => {
                Meteor.call('project.imageProfile', this.props.match.params.id, data.target.result, (err) => {
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast('Profile project correctly uploaded', 4000);
                    }
                })
            }
            FR.readAsDataURL(image);
        }else{
            Materialize.toast('image bigger than 10mb or not a image', 4000);
        }
    }
    
    backgroundSubmit(e){
        e.preventDefault();
        let image = e.target.BackgroundInput.files[0];
        if(image.size < 10485760){
            let FR = new FileReader();
            FR.onload = (data) => {
                Meteor.call('project.imageBackground', this.props.match.params.id, data.target.result, (err) => {
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast('Profile project correctly uploaded', 4000);
                    }
                })
            }
            FR.readAsDataURL(image);
        }else{
            Materialize.toast('image bigger than 10mb or not a image', 4000);
        }

    }

    test(e){
        e.preventDefault();
        let title = e.target.title.value;
        let description = e.target.description.value;
        let project = this.props.projectOne[0];
        if(title == ''){
            title = project.name;
        }
        if(description == ''){
            description = project.desc;
        }
        Meteor.call('project.updateInformation',
            this.props.projectOne[0]._id,
            title,
            description, 
            (err)=>{
                if(err){
                    Materialize.toast(err.reason, 4000);
                }else{
                    Materialize.toast("Correctly Update !", 4000);
                }   
            }
        );
        this.setState({onOpenFirstModal: false});
        e.target.reset();
    }

    descriptionUrl(text){
        if(document.getElementById("converted_url")){
            var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            var text1=text.replace(exp, "<a href='$1'>$1</a>");
            var exp2 =/(^|[^\/])(www\.[\S]+(\b|$))/gim;
            document.getElementById("converted_url").innerHTML=text1.replace(exp2, '$1<a target="_blank" href="http://$2">$2</a>');
        }
    }

    render() {
        var today = new Date();
        const project = this.props.projectOne[0];
        if(project){
            let accepted = false;
            if(project.collegue){
                for(let i = 0; project.collegue.length > i; i++){
                    if(project.collegue[i] === Meteor.userId()){
                        accepted = true;
                    }
                }
            }
            if(project.owner === Meteor.userId() || accepted){
                return (    
                    <div className="row">
                        <div className="col m12" style={{width: "100%"}}>
                            <div className="card">
                                <div className="card-image" style={{maxHeight: "200px", overflow: "hidden"}}>
                                    <img src={project.background ? project.background : "http://materializecss.com/images/sample-1.jpg"}/>
                                </div>
                                {this.owner('openModal')}
                                <div className="card-content">
                                    <span className="card-title"><h3>{project.name}</h3></span>
                                    <div>
                                        <div id="converted_url">
                                            {project.desc ? this.descriptionUrl(project.desc) : 'No description'}
                                        </div>
                                        <OneProjectOrganisation lanes={project.lanes} projectId={project._id}/>
                                        <OneProjectComments projectId={project._id} comments={project.comments}/>
                                        {this.owner('modal')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
                return (
                    <div>You can't access to this page</div>
                )
            }
        }else{
            return (
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            )
        }
    }
}
 
export default withTracker(({ match }) => {
    Meteor.subscribe('project.one', match.params.id);
    Meteor.subscribe('users');
    return {
        projectOne: Project.find({}).fetch(),
        users: Meteor.users.find().fetch(),
    };
})(OneProject);

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
        float: "none",
        marginTop: "40px",
        marginBottom: "40px",
    },
    formInput:{
        maxHeight: "300px",
        overflow: "scroll",
        padding: "10px",
        border: "1px #bfbfbf solid",
        marginBottom: "10px",
    },
    edit:{
        right: "10px",
        top: "161px",
    }
}