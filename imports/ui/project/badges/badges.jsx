import React, { Component } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
  } from 'react-router-dom';
import Main from './Component/Main/Main';
import BadgeCate from './Component/Badge/BadgeCate';
import BadgeList from './Component/Badge/BadgeList';
import Form from './Component/Form/Form';
import Succeed from './Component/Form/Succeed';
import Already from './Component/Form/Already';
import Notfound from './Component/Charging/Notfound';
import Progress from './Component/Charging/Progress';
import './Asset/css/style.css';

class Badges extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {
                allbadge:[],
                notags: []
            },
            tablecategory: [
                ["All Badge", "allbadge"],
                ["No Tags", "notags"],
            ],
            error: "",
            progressbar: 0,
            badgeId: "",
            succeed: "",
            already: "",
            succeedMessage: "",
        }
    }

    componentWillMount() {
        axios.get('https://inside.becode.org/api/v1/badges',{header:{
            "cache-control":"no-cache",
            "content-type":"text/html; charset=utf-8"
        }})
        .then((response) => {
            this.sort(response)
        })
        .catch((error) => {
            this.setState({error: error})
        })
    }

    slugify(text){
        return text.toString().toLowerCase()
            .replace(/\s+/g, '')
            .replace(/-+/g, '')
    }

    sort(badges){
        let category = this.state.category;
        for(let i = 0; i < badges.data.length; i++){
            let badge = badges.data[i];
            let tablecategory = this.state.tablecategory;
            let progress = this.state.progressbar + 100/badges.data.length;
            this.setState({progressbar: progress});
            if(badge.category_name){
                let category_name = this.slugify(badge.category_name);
                if (category[category_name]) {
                    category[category_name].push(badge);
                }else{
                    Object.defineProperty(category, category_name, {value : [badge],
                        writable : true,
                        enumerable : true,
                        configurable : true
                    });
                    tablecategory.unshift([badge.category_name, category_name]);
                }
            }else{
                category.notags.push(badge);
            }
            category.allbadge.push(badge);
            this.setState({category: category});
            this.setState({tablecategory: tablecategory});
        }
        this.setState({progressbar: 100});
    }

    setBadgeForm(state, badgeId){
        if(state === "add"){
            this.setState({badgeId: badgeId});
        }else if(state === "delete"){
            this.setState({badgeId: ""});
        }
    }

    setSucceed(state, message){
        if(state === "add"){
            this.setState({succeed: true});
            this.setState({succeedMessage: message});
        }else if(state === "already"){
            this.setState({already: true});
            this.setState({succeedMessage: message});
        }else if(state === "delete"){
            this.setState({succeed: ""});
            this.setState({already: ""});
        }
    }
    render() { 
        if(this.state.progressbar > 99){
            return (
                <Router basename={'/badges'}>
                    <div>
                        <div className="nav">
                        <div className="navBar">
                                <ul className="navBar">
                                    <li><Link to="/">Home Badges</Link></li>
                                </ul>
                            </div>
                            <div className="navBar">
                                <ul className="navBar">
                                    <li><Link to="/badgecategory/allbadge">Badges</Link></li>
                                </ul>
                            </div>
                        </div>
                        <Switch>
                            <Route path="/" exact>
                                <Main progress={this.state.progressbar} category={this.state.tablecategory}/>
                            </Route>
                            <Route path="/badgecategory" exact>
                                <BadgeCate category={this.state.tablecategory}/>
                            </Route>
                            <Route path="/badgecategory/:category" render={props => <BadgeList badge={this.state.category} {...props} setBadgeForm={this.setBadgeForm.bind(this)} />} />
                            <Route path="/form" exact render={props => <Form badgeId={this.state.badgeId} setBadgeForm={this.setBadgeForm.bind(this)} setSucceed={this.setSucceed.bind(this)}/>}/>
                            <Route path="/succeed" exact render={props => <Succeed succeed={this.state.succeed} setSucceed={this.setSucceed.bind(this)} message={this.state.succeedMessage}/>}/>
                            <Route path="/already" exact render={props => <Already already={this.state.already} setSucceed={this.setSucceed.bind(this)} message={this.state.succeedMessage}/>}/>
                            <Route component={Notfound}/>
                        </Switch>
                    </div>
                </Router>
            );
        }else{
            return (
                <div>
                    <Progress progress={this.state.progressbar}/>
                </div>
            );
        }
    }
}
 
export default Badges;