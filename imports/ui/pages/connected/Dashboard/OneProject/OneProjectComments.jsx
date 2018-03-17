import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Project } from '../../../../../api/ProjectCollections';
import { Collegue } from '../../../../../api/CollegueTest';

let Ago;

export default class OneProjectComments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            afficheCommentMax: 5,
            afficheSousCommentMax: 5
         }
    }

    componentWillUnmount(){  
        clearInterval(Ago);
    }

    componentDidUpdate(){
        this.ago();
    }

    componentDidMount(){
        this.ago();
        let self = this;
        Ago = setInterval(function() {self.ago()},1000*60);

    }

    ago(){
        let time = document.querySelectorAll('#time');
        for(let i = 0;time.length > i; i++){
            let timestamp = parseInt(time[i].className);
            let secondes = Math.round(((new Date().getTime()) - timestamp)/1000);
            let prefixe = 'Il y a ';
            let secScreen;
            secondes = Math.abs(secondes);
            if(secondes < 60){
                secScreen = ' quelques secondes'
            }else if(secondes < 3600){
                secScreen = Math.round(secondes/60) + ' minutes '
            }else if(secondes < (3600*24)){
                secScreen = Math.round(secondes/3600) + ' heures ' 
            }else{
                secScreen = Math.round(secondes/(3600*24)) + ' jours ' 
            }
            time[i].innerHTML=prefixe + secScreen;
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let comment = e.target.comment.value;
        if(comment){
            Meteor.call('project.commentInsert',
                Date.now(),
                this.props.projectId,
                comment, 
                (err)=>{
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast("Comment Send !", 4000);
                    }   
                }
            );
            e.target.reset();
        }
    }

    handleSubmitbycomment(e){
        e.preventDefault();
        let comment = e.target.comment.value;
        if(comment){
            Meteor.call('project.commentByComment',
                Date.now(),
                this.props.projectId,
                parseInt(e.target.comment.id),
                e.target.comment.value, 
                (err)=>{
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast("Comment Send !", 4000);
                    }   
                }
            );
            e.target.reset();
        }
    }

    like(e){ 
        e.preventDefault();
        var like = false;
        for(let i = 0; this.props.comments.length > i; i++){
            if(parseInt(e.target.test.value) === this.props.comments[i]._id){
                if(this.props.comments[i].like && this.props.comments[i].like[0]){
                    for(let j = 0; this.props.comments[i].like.length > j; j++){
                        if(this.props.comments[i].like[j].from == Meteor.userId()){
                            like = true;
                        }
                    }
                }
            }
        }
        if(!like){
            Meteor.call('project.addLike',
            this.props.projectId,
            parseInt(e.target.test.value),
            (err)=>{
                if(err){
                    Materialize.toast(err.reason, 4000);
                }else{
                    Materialize.toast("Like Send !", 4000);
                }   
            }
        );
    }else{
        Meteor.call('project.removeLike',
            this.props.projectId,
            parseInt(e.target.test.value),
            (err)=>{
                if(err){
                    Materialize.toast(err.reason, 4000);
                }else{
                    Materialize.toast("Like Remove !", 4000);
                }   
            });
        }
    }

    comment(){
        if(this.props.comments){
            var afficheMax = this.state.afficheCommentMax;
            var start, end;
            if(this.props.comments.length > afficheMax ){
                end = this.props.comments.length;
                start = this.props.comments.length - afficheMax;
            }else{
                end = this.props.comments.length;
                start = 0;
            }
            return(
                <ul className="ulPrincipalComment">
                    {this.props.comments.slice(start, end).map((commentary, index)=>{
                        let user;
                        if(Meteor.user()){
                            user = Meteor.users.findOne({"_id": commentary.from});
                        }
                        if(user){
                            return(
                                <li key={index} className="liPrincipalComment">
                                    <div className="userCommentPrincipal">
                                        <img className="imgPrincipal"  src={user.profile.avatar} alt='image profil'/>
                                        <div className="textCommentTitle">
                                            <span className="username">{user.profile.username} {user.profile.lastname}: </span> 
                                            <span className="commentSecond">{commentary.comment}</span>
                                            <span id="time" className={commentary._id}>il y a quelques secondes</span>
                                            <form className='like formLike' onSubmit={this.like.bind(this)} href='#'>
                                                <input type="hidden" name="test" value={commentary._id}/>
                                                <button className="buttonLike">
                                                    <i name='id' id={commentary._id} className="material-icons prefix iconLike">tag_faces</i><span className="likes">{commentary.like ? commentary.like.length : 0}</span>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="userCommentSecond">
                                        {this.sousComment(commentary.sousComment)}
                                        <div className="row" style={{marginBottom: 0}}>
                                            <form className="col s12" onSubmit={this.handleSubmitbycomment.bind(this)}>
                                                <div className="row" style={{marginBottom: 0}}>
                                                    <div className="input-field col s12">
                                                        <i className="material-icons prefix">low_priority</i>
                                                        <input id={commentary._id} type="text" className="validate" name="comment" autoComplete="off"/>
                                                        <label htmlFor="commentByComment">Reply</label>
                                                    </div>
                                                </div>
                                                <button style={{display: "none"}}>Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </li>
                            ) 
                        }
                    })}
                </ul>
            )
        }
    }

    sousComment(sousComment){
        if(sousComment){
            var afficheMax = this.state.afficheSousCommentMax;
            var start, end
            if(sousComment.length > afficheMax ){
                end = sousComment.length;
                start = sousComment.length - afficheMax;
            }else{
                end = sousComment.length;
                start = 0;
            }
            return(
                <ul className="ulSecondComment">
                    {sousComment.slice(start, end).map((commentary, index)=>{
                        let user;
                        if(Meteor.user()){
                            user = Meteor.users.findOne({"_id": commentary.comments.from});
                        }
                        if(user){
                            return(
                                <li key={index} className="liSecondComment">
                                    <img className="imgSecond" src={user.profile.avatar} alt='image profil'/>
                                    <div className="textComment">
                                        <span className="usernameSecond">{user.profile.username} {user.profile.lastname}: </span> 
                                        <span className="commentSecond">{commentary.comments.comment}</span>
                                    </div>
                                </li>
                            )
                        }
                    })}
                </ul>
            )
        }
    }

    changeMaxComment(e){
        e.preventDefault();
        let value = parseInt(e.target.value);
        this.setState({afficheCommentMax: value});
    }
    
    changeMaxSousComment(e){
        e.preventDefault();
        let value = parseInt(e.target.value);
        this.setState({afficheSousCommentMax: value});
    }

    render() {
        return(
            <div>
                <h4>Comments</h4>
                {this.comment()}
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="row" style={{marginBottom: 0}}>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">low_priority</i>
                            <input id="comment" type="text" className="validate" name="comment" autoComplete="off"/>
                            <label htmlFor="comment">Comments</label>
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </div>
                </form>
                <div className="row">
                    <div className="col m6 s12">
                        <span className="spanComment">Max comments : </span>
                        <select id="lang" defaultValue="5" onChange={this.changeMaxComment.bind(this)} value={this.state.value}>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="9999999">See All</option>
                        </select>
                    </div>
                    <div className="col m6 s12">
                        <span className="spanComment">Max response of comments</span>
                        <select id="lang" defaultValue="5" onChange={this.changeMaxSousComment.bind(this)} value={this.state.value}>
                            <option value="1">1</option>
                            <option value="5" >5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="9999999">See All</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
} 