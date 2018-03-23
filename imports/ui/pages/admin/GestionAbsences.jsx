import React, { Component } from 'react';
import AdminRedirectCoonectedComp from '../../func/redirection/adminRedirectConnectedConnection';
import { withTracker } from 'meteor/react-meteor-data';
import InfiniteCalendar from 'react-infinite-calendar';
import firebase from 'firebase';
import {Tabs, Tab} from 'material-ui/Tabs';

const Users = Meteor.users.find();

var today = new Date();
var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

let dateSelected = today.toDateString();
let userSelected = "";

function selectedDate(value){
    dateSelected = value;
}
var storage = firebase.storage();
var storageRef = storage.ref();

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
};

class GestionAbsences extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchString : "",
            searchStringUser: "",
        }
    }
    userInformation(){
        let users = this.props.users;
        if(users && window.document.body.offsetWidth < 810){
            window.scrollTo(0, 300);
        }
        if(users[0] && users[0].absences){
            return(
                users.map((user, index)=>{
                    if(user.absences){
                        return(
                            <div key={index} className="absencesCard">
                                <div className="nameAbsences">
                                    <p>{user.profile.username} {user.profile.lastname} {user.emails[0].address}</p>
                                </div>
                                {user.absences.map((absence, index)=>{
                                    if(absence.date == dateSelected){
                                        return(
                                            <div className="causeAbsences" key={index}>
                                                <div className="dateAbsences">
                                                    <p>{absence.date}</p>
                                                    <p>{absence.time ? absence.time : "No time indicated"}</p>
                                                </div>
                                                <div className="raisonAbsences">
                                                    <p>{absence.cause}</p>
                                                </div>
                                                {this.downloadButton(absence.link)}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    }
                })
            )
        }else{
            return(
                <div className="absencesCard">
                    <p>Pas d'absences prévue</p>
                </div>
            )
        }
    }

    downloadButton(link){
        if(link){
            return(
                <div style={{width: "10%"}}>
                    <form onSubmit={this.downloadFile.bind(this)}>
                        <input type="hidden" name="absencesLink" value={link} />
                        <button style={{background: "transparent", border: "none",float: "right", color: "#2c91ff"}}>
                            <i className="material-icons prefix">file_download</i>
                        </button>
                    </form>
                </div>
            )
        }
    }

    soloUserInformation(absences){
        let OneUsers = this.props.OneUsers;
        if(OneUsers && window.document.body.offsetWidth < 810){
            window.scrollTo(0, 300);
        }
        if(OneUsers[0] && absences){
            let user = OneUsers[0];
            absences.sort(function (date1, date2) {
                if (new Date(date1.date) > new Date(date2.date)){
                    return -1;
                } 
                if (new Date(date1.date) < new Date(date2.date)){
                    return 1
                } 
                return 0;
            });
            return(
                <div className="absencesCard">
                    <div className="nameAbsences">
                        <p>{user.profile.username} {user.profile.lastname} {user.emails[0].address}</p>
                    </div>
                    {absences.map((absence, index)=>{
                        return(
                            <div className="causeAbsences" key={index}>
                                <div className="dateAbsences">
                                    <p>{absence.date}</p>
                                    <p>{absence.time ? absence.time : "Pas d'heure indiqué"}</p>
                                </div>
                                <div className="raisonAbsences">
                                    <p>{absence.cause}</p>
                                </div>
                                <div style={{width: "10%"}}>
                                    <form onSubmit={this.downloadFile.bind(this)}>
                                        <input type="hidden" name="absencesLink" value={absence.link} />
                                        <button style={{background: "transparent", border: "none",float: "right", color: "#2c91ff"}}>
                                            <i className="material-icons prefix">file_download</i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )
                    })}
                </div>     
            )
        }else{
            return(
                <div className="absencesCard">
                    <p>Pas d'absences prévue</p>
                </div>
            )
        }
    }

    downloadFile(e){
        e.preventDefault();
        let fileName = e.target.absencesLink.value;
        var starsRef = storageRef.child('absences/' + fileName);
        starsRef.getDownloadURL().then(function(url) {
            var win = window.open(url, '_blank');
            if (win == null || typeof(win)=='undefined') {  
                Materialize.toast('Please disable your pop-up blocker and try again.', 4000); 
            } 
            else {  
                win.focus();
            }
          }).catch(function(error) {
              Materialize.toast(error.code, 4000);
          });
    }

    handleSubmit(e){
        e.preventDefault();
        userSelected = e.target.absences.value;
        Session.set('user', userSelected)
    }

    handleChange(event){
        var test = this.slugify(event.target.value);
        var re = /\W/;
        var re2 = /\s/;
        if(!re.test(test)){
          this.setState({searchString: test});
        }
        if(re2.test(event.target.value)){
          this.setState({searchString: test});
        }
    }

    handleChangeUser(event){
        var test = this.slugify(event.target.value);
        var re = /\W/;
        var re2 = /\s/;
        if(!re.test(test)){
          this.setState({searchStringUser: test});
        }
        if(re2.test(event.target.value)){
          this.setState({searchStringUser: test});
        }
    }

    slugify(text){
        return text.toString().toLowerCase()
    }

    listUser(){
        if(this.props.allUsers){
            users = this.props.allUsers;
            return(
                users.map((user, index)=>{
                    return(
                        <div className="soloAbsences" key={index}>
                            <div className="imageSolo">
                                <img src={user.profile.avatar ? user.profile.avatar : "http://www.thecortexhub.com/wp-content/uploads/2015/08/no-profile.gif"} />
                            </div>
                            <div style={{padding: "15px",width: "52%"}}>
                                <p style={{wordWrap: "break-word"}}>{user.profile.username} {user.profile.lastname}</p>
                                <p style={{wordWrap: "break-word"}}>{user.emails ? user.emails[0].address : ""}</p>
                            </div>
                            <div className="buttonRightSolo">
                                <form onSubmit={this.handleSubmit.bind(this)}> 
                                    <input type="hidden" name="absences" value={user._id} />
                                    <button className="col s12 waves-effect waves-light btn btn-block buttonRightSoloButton"><i className="material-icons prefix">chevron_right</i></button>
                                </form>
                            </div>
                        </div>
                    )
                })
            )
        }
    }
    
    soloListUser(allUsers){
        if(allUsers){
            return(
                allUsers.map((user, index)=>{
                    return(
                        <div className="soloAbsences" key={index}>
                            <div className="imageSolo">
                                <img src={user.profile.avatar ? user.profile.avatar : "http://www.thecortexhub.com/wp-content/uploads/2015/08/no-profile.gif"} />
                            </div>
                            <div style={{padding: "15px",width: "52%"}}>
                                <p style={{wordWrap: "break-word"}}>{user.profile.username} {user.profile.lastname}</p>
                                <p style={{wordWrap: "break-word"}}>{user.emails ? user.emails[0].address : ""}</p>
                            </div>
                            <div className="buttonRightSolo">
                                <form onSubmit={this.handleSubmit.bind(this)}> 
                                    <input type="hidden" name="absences" value={user._id} />
                                    <button className="col s12 waves-effect waves-light btn btn-block buttonRightSoloButton"><i className="material-icons prefix">chevron_right</i></button>
                                </form>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    allListUserAbsence(){
        if(this.props.allUsers){
            let allUsers = this.props.allUsers;
            return(
                allUsers.map((user)=>{
                    if(user.absences && user.absences.length > 0){
                        let absences = user.absences;
                        absences.sort(function (date1, date2) {
                            console.log(date1)
                            console.log(date2)
                            if (new Date(date1.date) > new Date(date2.date)){
                                return -1;
                            } 
                            if (new Date(date1.date) < new Date(date2.date)){
                                return 1
                            } 
                            return 0;
                        });
                        console.log(absences)
                        return(
                            absences.map((absence, index)=>{
                                return(
                                    <div className="soloAbsences" key={index} style={{width: "98%",maxWidth: "900px",minWidth: "400px"}}>
                                        <div className="imageSolo">
                                            <img src={user.profile.avatar ? user.profile.avatar : "http://www.thecortexhub.com/wp-content/uploads/2015/08/no-profile.gif"} />
                                        </div>
                                        <div style={{padding: "6px",width: "47%"}}>
                                            <p style={{wordWrap: "break-word"}}>{user.profile.username} {user.profile.lastname}</p>
                                            <p style={{wordWrap: "break-word"}}>{user.emails ? user.emails[0].address : ""}</p>
                                        </div>
                                        <div className="dateAbsences">
                                            <p>{absence.date}</p>
                                            <p>{absence.time ? absence.time : "Pas d'heure indiqué"}</p>
                                        </div>
                                        <div style={{margin: "auto"}}>
                                            <form onSubmit={this.downloadFile.bind(this)}>
                                                <input type="hidden" name="absencesLink" value={absence.link} />
                                                <button style={{background: "transparent", border: "none", color: "#2c91ff"}}>
                                                    <i className="material-icons prefix">file_download</i>
                                                </button>
                                            </form>
                                        </div>
                                        <div className="raisonAbsences" style={{width: "100%"}}>
                                            <p>{absence.cause}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )                        
                    }
                })
            )
        } 
    }

    filterByCause(){
        if(this.props.OneUsers && this.props.OneUsers[0]){
            var libraries = this.props.OneUsers[0].absences;
        }
        var searchString = this.state.searchString.toLowerCase();
        if(searchString.length > 0 && libraries && libraries.length > 0){
            libraries = libraries.filter(function(l){
                let filter = l.cause + " " + l.date;
                return filter.toLowerCase().match( searchString );
            });
        }
        return(
            this.soloUserInformation(libraries)
        ) 
    }

    filterByName(){
        if(this.props.allUsers){
            var libraries = this.props.allUsers;
        }
        var searchStringUser = this.state.searchStringUser.toLowerCase();
        if(searchStringUser.length > 0 && libraries && libraries.length > 0){
            libraries = libraries.filter(function(l){
                let test = l.profile.username + " " + l.profile.lastname + " " + l.emails[0].address;
                return test.toLowerCase().match(searchStringUser);
            });
        }
        return(
            this.soloListUser(libraries)
        ) 
    }

    prevent(e){
        e.preventDefault();
    }

    render() {
        if(Meteor.user()){
            let users = this.props.users;
            return (
                <div>
                    <AdminRedirectCoonectedComp />
                    <Tabs>
                        <Tab label="Calendar" >
                            <div className="absences">
                                <div className="left">
                                    <InfiniteCalendar
                                        width={"100%"}
                                        height={600}
                                        selected={today}
                                        onSelect={function(date) {
                                            selectedDate(date.toDateString());
                                            Session.set('test', date.toDateString())
                                        }}
                                        locale={{
                                            locale: require('date-fns/locale/fr'),
                                            headerFormat: 'dddd, D MMM',
                                            weekdays: ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"],
                                            blank: 'Aucune date selectionnee',
                                            todayLabel: {
                                                long: 'Aujourd\'hui',
                                                short: 'Auj.'
                                            }
                                        }}
                                        locale={{
                                            weekStartsOn: 1
                                        }}
                                    />
                                </div>
                                <div className="right">
                                    {this.userInformation()}
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Users" >
                            <div className="absences">
                                <div className="left">
                                    <form onSubmit={(e) => {e.preventDefault()}}>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={this.state.searchStringUser} 
                                                onChange={this.handleChangeUser.bind(this)} 
                                                className="searchTerm"
                                            />
                                            <label htmlFor="search">Search user</label>
                                        </div>
                                    </form>
                                    {this.filterByName()}
                                </div>
                                <div className="right">
                                    <form onSubmit={(e) => {e.preventDefault()}}>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={this.state.searchString} 
                                                onChange={this.handleChange.bind(this)} 
                                                className="searchTerm"
                                            />
                                            <label htmlFor="search">Search missing</label>
                                        </div>
                                    </form>
                                    {this.filterByCause()}    
                                </div>
                            </div>
                        </Tab>
                        <Tab label="All absences" >
                            <div className="absences">
                                {this.allListUserAbsence()}
                            </div>
                        </Tab>
                    </Tabs>
                    
                </div>
            );
        }else{
            return(
                <div>
                    Loading
                </div>
            )
        }
    }
}
    
export default withTracker(props => {
    if(Meteor.user()){
        let test = Session.get('test');
        let user = Session.get('user');
        Meteor.subscribe('allUsersAbsences', Meteor.user().profile.role);
        Meteor.subscribe('allUsers', Meteor.user().profile.role);
        return {
            users: Meteor.users.find({ "absences.date" : dateSelected }).fetch(),
            allUsers: Meteor.users.find({}).fetch(),
            OneUsers: Meteor.users.find({_id: userSelected}).fetch(),
        };
    }else{
        Meteor.subscribe('allUsers');
        return {
            users: Meteor.users.find({_id : Meteor.userId()}).fetch()
        };
    }
})(GestionAbsences);

