import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import RedirectCoonectedComp from '../../func/redirection/redirectConnectedConnection';
import Modal from 'react-responsive-modal';
import { users } from '../../../api/UserCollection';
import Axios from 'axios';
import firebase from 'firebase';

import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';
import persianUtils from 'material-ui-persian-date-picker-utils';

import TimePicker from 'material-ui/TimePicker';
import { DateRange } from 'react-date-range';

let DateTimeFormat;

var config = {
    apiKey: "AIzaSyBNbNqvt-WmEhAAwV2RxJxir3II1g-eTiA",
    authDomain: "project-622bb.firebaseapp.com",
    databaseURL: "https://project-622bb.firebaseio.com",
    projectId: "project-622bb",
    storageBucket: "project-622bb.appspot.com",
    messagingSenderId: "145787839222"
  };
  firebase.initializeApp(config);

if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
    DateTimeFormat = global.Intl.DateTimeFormat;
  } else {
    const IntlPolyfill = require('intl');
    DateTimeFormat = IntlPolyfill.DateTimeFormat;
    require('intl/locale-data/jsonp/fr');
    require('intl/locale-data/jsonp/fa-IR');
  }

class Absences extends Component {
    constructor(props){
        super(props);
        this.state = {
            'rangePickerMobile' : {},
            redirect: false,
            openModalDay: false,
            openModalMultiple: false,
            date: "",
            hour: "",
            raison: '',
            justificatif: '',
            err: '',
            progress: 0,
            link: "",
          }
    }

    handleChange(which, payload) {
        this.setState({
          [which] : payload
        });
    }

    handleSubmit(e){
        e.preventDefault();
        var dates = this.getDates(new Date(this.state.rangePickerMobile.startDate._d), new Date(this.state.rangePickerMobile.endDate._d));                                                                                                           
        if(dates[0]){
            if(this.state.progress == 100){
                if(dates.length < 30){
                    let self = this;
                    dates.forEach(function(dateSingle) {
                        let date = dateSingle.toDateString();
                        Meteor.users.update(
                            {_id : Meteor.userId()},
                            { $push : { 
                                absences : { 
                                    date, 
                                    cause: self.state.raison, 
                                    justificatif: self.state.justificatif, 
                                    type: "multiple",
                                    link: self.state.link,
                                } 
                            } 
                        }, (err) => {
                            if(err){
                                self.setState({err : err})
                            }
                        })
                    });
                    if(this.state.err){
                        Materialize.toast(this.state.err.reason, 4000);
                    }else{
                        Materialize.toast("Request been send !", 4000);
                    }
                    this.onCloseMultiple()
                }else{
                    Materialize.toast("Too mush dates !", 4000);
                }
            }else{
                Materialize.toast("Wait the ned of the upload", 4000);
            }
        }else{
            Materialize.toast("Select the date !", 4000);
        }
    }

    getDates(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
              var date = new Date(this.valueOf());
              date.setDate(date.getDate() + days);
              return date;
            };
        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    handleSubmitDay(e){
        e.preventDefault();
        let dates = new Date(this.state.date.toDateString() + " " + this.state.hour.toLocaleTimeString());
        if(dates){
            if(this.state.progress == 100){
                let date = dates.toDateString();
                let time = dates.toLocaleTimeString();
                Meteor.users.update(
                    {_id : Meteor.userId()},
                    { $push : { 
                        absences : {
                            date, 
                            time,
                            cause: this.state.raison, 
                            justificatif: this.state.justificatif, 
                            type: "day",
                            link: this.state.link,
                        } 
                    } 
                }, (err) => {
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast("Request been send !", 4000);
                    }
                })
                this.onCloseDay();
            }else{
                Materialize.toast("Wait the end of upload file", 4000);
            }
        }else{
            Materialize.toast("Select the date !", 4000);
        }
    }   

    handleSubmitForm(e){
        e.preventDefault();
        let absencesDay = e.target.absences[0].checked;
        let absencesMultiple = e.target.absences[1].checked;
        if(e.target.file.files[0] && e.target.textarea1.value){
            if(this.state.progress == 0){
                if(absencesDay || absencesMultiple){
                    if(e.target.file.files[0].size){
                        let file = e.target.file.files[0];
                        let newFileName = (Meteor.user().profile.username + "_" + Meteor.user().profile.lastname + "_" + Date.now()+file.name).replace(/ /g,'');
                        let blob = file.slice(0, -1, file.type);
                        newFile = new File([blob], newFileName, {type: file.type});
                        this.setState({link: newFile.name});
                        var storageRef = firebase.storage().ref('absences/' + newFile.name);
                        var task = storageRef.put(newFile);
                        var self = this;
                        task.on('state_changed',
                            function progress(progress){
                                var pourcentage = Math.round((progress.bytesTransferred / progress.totalBytes) * 100);
                                self.setState({progress: pourcentage});
                                document.querySelector('.determinate').style.width = pourcentage + "%";
                            }
                        )
                    }else{
                        Materialize.toast('file bigger than 10mb or not a image', 4000);
                    }
                    
                    if(e.target.textarea1.value){
                        this.setState({raison : e.target.textarea1.value})
                    }
                    
                    if(absencesDay || absencesMultiple){
                        this.openModal(absencesDay, absencesMultiple);
                    }
                }else{
                    Materialize.toast('Please, select a type of missing', 4000);
                }
            }else if(this.state.progress == 100){
                Materialize.toast('You have already upload the file', 4000);
                if(absencesDay || absencesMultiple){
                    this.openModal(absencesDay, absencesMultiple);
                }
            }
            else{
                Materialize.toast('The file is uploading', 4000);
                if(absencesDay || absencesMultiple){
                    this.openModal(absencesDay, absencesMultiple);
                }
            }
        }else{
            Materialize.toast('Please, complete the form correctly', 4000);
        }
    }

    openModal(a, b){
        if(a){
            this.setState({openModalDay: true});
        }else if(b){
            this.setState({openModalMultiple: true});
        }
    }

    handleChangeDate(event, date){
        this.setState({date})
    }

    handleChangeHours(event, hour){
        this.setState({hour: hour})
    }

    onCloseMultiple(){
        this.setState({openModalMultiple: false})
    }

    onCloseDay(){
        this.setState({openModalDay: false})
    }

    render() { 
        const {
            rangePickerMobile,
        } = this.state;

        if(this.state.redirect){
            return <Redirect to="/" />
        }
        
        return ( 
            <div className="absencesPage">
                <RedirectCoonectedComp />
                <h2>Absences</h2>
                <p>Anoncer une absence :</p>

                <Modal open={this.state.openModalMultiple} onClose={this.onCloseMultiple.bind(this)} little>
                    <DateRange
                        onInit={this.handleSelect}
                        onChange={this.handleSelect}
                        theme={dateRangeStyle}
                        onInit={ this.handleChange.bind(this, 'rangePickerMobile') }
                        onChange={ this.handleChange.bind(this, 'rangePickerMobile') }
                    />
                    <div className="row">
                        <div className="col s6">
                            <span>De :</span>
                            <input type="text" readOnly value={this.state.rangePickerMobile.startDate ? this.state.rangePickerMobile.startDate._d.toDateString() : ""} />
                        </div>    
                        <div className="col s6">
                            <span>Jusqu'à :</span>
                            <input type="text" readOnly value={this.state.rangePickerMobile.endDate ? this.state.rangePickerMobile.endDate._d.toDateString() : ""} />
                        </div>    
                        <div className="col s12">
                            <button className="col s12 waves-effect waves-light btn btn-block" onClick={this.handleSubmit.bind(this)}>Submit</button>
                        </div>    
                    </div>
                </Modal>

                <Modal open={this.state.openModalDay} onClose={this.onCloseDay.bind(this)} little>
                    <div className="row">
                        <div className="col s6">
                            <DatePicker
                                hintText="inserez la date..."
                                DateTimeFormat={DateTimeFormat}
                                okLabel="OK"
                                cancelLabel="Annuler"
                                locale="fr"
                                onChange={this.handleChangeDate.bind(this)}
                            />
                        </div>
                        <div className="col s6">
                            <TimePicker
                                format="24hr"
                                hintText="inserez l'heure..."
                                onChange={this.handleChangeHours.bind(this)}
                                />
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block" onClick={this.handleSubmitDay.bind(this)}>Submit</button>
                    </div>
                </Modal>
                <br/>
                <div className="row">
                    <form className="col s12" onSubmit={this.handleSubmitForm.bind(this)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id="textarea1" name="textarea1" className="materialize-textarea" data-length="120"></textarea>
                                <label htmlFor="textarea1">Raison de l'absences</label>
                            </div>
                        </div>
                        <div className="file-field input-field">
                            <div className="row">
                                <div className="input-field col s12">
                                    <span style={{color : "#9e9e9e"}}>Justificatif :</span>
                                </div>
                                <div className="input-field col s12">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" name="file"/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text"/>
                                    </div>
                                    <div className="progress">
                                        <div className="determinate" style={{width: "0%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <p className="col s6">
                                <input type="radio" name="absences" id="tardive"/>
                                <label htmlFor="tardive">Arrivée tardive</label>
                            </p>
                            <p className="col s6">
                                <input type="radio" name="absences" id="multipleDays"/>
                                <label htmlFor="multipleDays">Absence de plusieur jours</label>
                            </p>
                            <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
         )
    }
}
 
export default Absences;

let dateRangeStyle = {
    DateRange      : {
      background   : '#ffffff',
      textAlign    : "center",
    },
    Calendar       : {
      background   : 'transparent',
      color        : '#95a5a6',
      boxShadow    : '0 0 10px lightgrey',
    },
    MonthAndYear   : {
      background   : '#566183',
      color        : '#ffffff'
    },
    MonthButton    : {
      background   : '#ffffff'
    },
    MonthArrowPrev : {
      borderRightColor : '#556083',
    },
    MonthArrowNext : {
      borderLeftColor : '#556083',
    },
    Weekday        : {
      background   : '#566183',
      color        : '#ffffff'
    },
    Day            : {
      transition   : 'transform .1s ease, box-shadow .1s ease, background .1s ease'
    },
    DaySelected    : {
      background   : '#394259'
    },
    DayActive    : {
      background   : '#394259',
      boxShadow    : 'none'
    },
    DayInRange     : {
      background   : '#576283',
      color        : '#fff'
    },
    DayHover       : {
      background   : '#ffffff',
      color        : '#7f8c8d',
      transform    : 'scale(1.1) translateY(-10%)',
      boxShadow    : '0 2px 4px rgba(0, 0, 0, 0.4)'
    }
}