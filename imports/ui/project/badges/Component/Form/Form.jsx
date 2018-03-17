import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Redirect } from 'react-router-dom';

const styles = {
    fadeInDown: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    }
}

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            response: ""
        }
    }

    componentWillMount(){
        if(!this.props.badgeId){
            this.setState({redirect: true})
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        Object.entries(document.querySelectorAll(".input")).forEach((input, index) => {
            let label = document.querySelectorAll(".label")[index];
            input[1].addEventListener('focusin', function(){
                label.classList.add("active");
            })
            input[1].addEventListener('focusout', function(){
                if(input[1].value.length === 0){
                    label.classList.remove("active");
                }
            })
            window.addEventListener('scroll', this.searchBar.bind(this));
        })
    }

    componentWillUnmount(){
        this.props.setBadgeForm("delete", this.props.badgeId);
        window.removeEventListener('scroll', this.searchBar.bind(this));
    }

    searchBar(){
        if(document.querySelectorAll(".searchBar").length > 0){
            if (window.scrollY > 258) {
                document.querySelector(".searchBar").classList.add("fixe");
            } else {
                if(document.querySelector(".searchBar")){
                    document.querySelector(".searchBar").classList.remove("fixe");
                }
            }   
        }
    }

    redirect(){
        if(this.state.redirect === "succeed"){
            return(
                <Redirect to="/succeed" />
            )
        }else if(this.state.redirect === "already"){
                return(
                    <Redirect to="/already" />
                )
        }else if(this.state.redirect){
                return(
                    <Redirect to="/" />
                )
        }
    }

    testUrl(repo){
        let repoTesting = repo.substr(0, 19) ===  "https://github.com/" ? true : false; // test si les premiers caratère sont bien https://github.com/
        if(repoTesting){
          return true;
        }
    }
  
    checkEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }

    submit(e){
        if(Meteor.user().emails[0].address){
            e.preventDefault();
            let email = this.checkEmail(Meteor.user().emails[0].address);
            let urlGit = this.testUrl(this.urlGit.value);
            let urlProjet = this.urlProjet.value !== "" ? true : false;
            let badgeId = this.props.badgeId.badgr_id.length === 22 ? true : false;
            if(email && urlGit && urlProjet && badgeId){
                let xhr = new XMLHttpRequest();
                let data =
                "user_email="+Meteor.user().emails[0].address+
                "&github_url="+this.urlGit.value+
                "&project_url="+this.urlProjet.value+
                "&comment="+this.commentaire.value+
                "&badges_id="+this.props.badgeId.id;
                xhr.open('POST', 'https://inside.becode.org/api/v1/badges/claim', true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                let these = this;
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4 && xhr.status === 200){
                        let resp = JSON.parse(xhr.response)
                        these.setState({response: resp});
                    }
                }
                xhr.send(data);
            }else{
                this.setState({response: "Please fill out the form correctly"})
            }
        }else{
            Materialize.toast("Your mail does'nt exist", 4000);
        }
    }

    response(){
        if(this.state.response !== ""){
            let resp = this.state.response;
            switch(resp.code) {
                case 200:
                    this.props.setSucceed("add", resp.message);
                    this.setState({redirect: "succeed"});
                    break;
                case 212:
                    this.props.setSucceed("already", resp.message);
                    this.setState({redirect: "already"});
                    break;
                default:     
                    if(resp.message === undefined){
                        if(resp === undefined){
                            this.popup("Please fill out the form correctly");
                        }else{
                            this.popup(resp);
                        }
                    }else{
                        let errorMessage = "";
                        for (var error in resp.errors) {
                            if (!resp.errors.hasOwnProperty(error)) continue;                        
                            var obj = resp.errors[error];
                            errorMessage = errorMessage + " " + obj;
                        }
                        let fullMessage = resp.message + " " + errorMessage;
                        this.popup(fullMessage);
                    }
                    break;
            }
        }
    }

    popup(inner){
        var iDiv = document.createElement('div');
        iDiv.className = 'alert';
        iDiv.innerText = inner;
        document.getElementsByTagName('body')[0].appendChild(iDiv);
        setTimeout(function() { iDiv.remove() }, 5000);
    }

    goBack(e){
        e.preventDefault();
        window.location.href = "javascript:history.back()";
    }

    render() {
        return (
            <StyleRoot>
                {this.redirect()}
                <div className="imageMainForm">
                    <section className="head">
                        <div className="innerHead" data-bf="INSERT" data-af="INFORMATION">FORM</div>
                    </section> 
                </div>
                <div className="searchBar">
                    <a id="prev" className="waves-effect waves-light btn openBadge" onClick={(e) => this.goBack(e)}><i style={{marginRight: "15px"}} className="fa fa-arrow-left"></i>Prev page</a>
                    <a id="openbadge" className="waves-effect waves-light btn openBadge" href={this.props.badgeId.badge_uri} target="_blank"> Open Badge </a>
                </div>
                <div className="badgeForm" style={styles.fadeInDown}>
                    <div className="badgeCardForm">
                        <div className="identitybadgeForm">
                            <div className="titleBadgeForm">
                                {this.props.badgeId.name}
                            </div>
                            <div className="imageBadgeForm">
                                <img src={this.props.badgeId.image} alt="imageBagde"/>
                            </div>
                        </div>
                        <div className="infoBadgeForm">
                            <div className="cateBadgeForm">
                                Category : {this.props.badgeId.category_name ? this.props.badgeId.category_name : "No Category"}
                            </div>
                            <div className="openLinkBadgeForm">
                                
                            </div>
                            <div className="descBadgeForm">
                                Description : <br/>
                                {this.props.badgeId.description}
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="badgeForm" style={styles.fadeInDown}>
                    <p>
                        To submit a badge fill out the form. <br/>
                        Insert the complete url of the GitHub repo containing the information needed to validate the badge.<br/>
                        The URL of the project is requested if it returns a result.<br/>
                    </p>
                    <form onSubmit={(e) => this.submit(e)}>
                        <div className="input-field">    
                            <label className="label" htmlFor="urlGit">Url GitHub</label>
                            <input className="input" type="text" id="urlGit" ref={(input)=>this.urlGit=input}/>
                        </div>
                        <div className="input-field">    
                            <label className="label" htmlFor="urlProjet">URL Project</label>
                            <input className="input" type="text" id="urlProjet" ref={(input)=>this.urlProjet=input}/>
                        </div>
                        <div className="input-field">   
                            <label className="label" htmlFor="commentaire">Commentary (Optional)</label>
                            <textarea className="input" type="text" id="commentaire" ref={(input)=>this.commentaire=input}>
                            </textarea>
                        </div>
                        <div className="button">
                            <button className="waves-effect waves-light btn" type="submit">Submit form</button>
                        </div>
                    </form>
                    {this.response()}
                </div>
            </StyleRoot>
        );
    }
}