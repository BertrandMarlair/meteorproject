import React, { Component } from 'react';
import BadgeSingle from './BadgeSingle';
import Radium, {StyleRoot} from 'radium';
import { fadeIn } from 'react-animations';

const styles = {
    fadeIn: {
      animation: 'x 0.4s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    },
    field:{
        width: "50%",
        float: "left"
    },
    block:{
        margin: "-1em",
    },
    label:{
        fontSize: "1rem",
        color: "#9e9e9e",
        lineHeight: "48px"
    }
}

export default class BadgeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            badge: {}
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        this.setState({badge: this.props.badge[this.props.match.params.category]})
        document.querySelector("input").addEventListener('focusin', function(){
            document.querySelector("label").classList.add("active");
        })
        document.querySelector("input").addEventListener('focusout', function(){
            if(document.querySelector("input").value.length === 0){
                document.querySelector("label").classList.remove("active");
            }
        });
        window.addEventListener('scroll', this.searchBar.bind(this));
    }  

    componentWillUnmount(){
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

    compareAlpha(a,b) {
        let objectNameA = a.name.toLowerCase()
        let objectNameB = b.name.toLowerCase()
        if (objectNameA < objectNameB)
          return -1;
        if (objectNameA > objectNameB)
          return 1;
        return 0;
    }

    compareId(a,b) {
        let objectNameA = a.id.toLowerCase()
        let objectNameB = b.id.toLowerCase()
        if (objectNameA < objectNameB)
          return -1;
        if (objectNameA > objectNameB)
          return 1;
        return 0;
    }

    compareCreated(a,b) {
        let objectNameA = a.creation_date.toLowerCase()
        let objectNameB = b.creation_date.toLowerCase()
        if (objectNameA < objectNameB)
          return -1;
        if (objectNameA > objectNameB)
          return 1;
        return 0;
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

    slugify(text){
        return text.toString().toLowerCase()
            .replace(/\s+/g, '')
            .replace(/-+/g, '')
            .replace(/\(+/g, '')
    }

    filter(){
        var libraries = this.state.badge;
        var searchString = this.state.searchString.trim().toLowerCase();
        if(searchString.length > 0){
            libraries = libraries.filter(function(l){
                return l.name.toLowerCase().match( searchString );
            });
        }
        return(
            this.mapping(libraries)
        ) 
    }

    mapping(badgeList){
        if(badgeList){
            if(badgeList.length > 0){
                return (
                    badgeList.map((badge) =>{
                        return(
                            <BadgeSingle key={badge.id} badgeSingle={badge} setBadgeForm={this.props.setBadgeForm}/>
                        )
                    })
                )
            }else{
                return ("No Result");
            }
        }else{
            return ("Badge list doesn't exist");
        }
    }

    sortBy(e){
        e.preventDefault();
        let badgeSort = this.state.badge;
        let type = e.target.value;
        if(type === "alpha"){
            badgeSort.sort(this.compareAlpha);
            this.setState({badge: badgeSort});
        }else if(type === "create"){
            badgeSort.sort(this.compareCreated);
            this.setState({badge: badgeSort});
        }
        else if(type === "id"){
            badgeSort.sort(this.compareId);
            this.setState({badge: badgeSort});
        }
    }

    prevent(e){
        e.preventDefault();
    }

    render() {
        return (
            <StyleRoot style={styles.fadeIn} className="MainList">
                <div className="imageMainBadge">
                    <section className="head">
                        <div className="innerHead" data-bf="SELECT" data-af="YOU WANT">BADGE</div>
                    </section> 
                </div>
                <div className="searchBar">
                    <form onSubmit={(e) => this.prevent(e)}>
                        <div className="input-field" style={styles.field}>
                            <input 
                                type="text" 
                                value={this.state.searchString} 
                                onChange={this.handleChange.bind(this)} 
                                className="searchTerm"
                            />
                            <label htmlFor="search">Search the badge</label>
                        </div>
                        <div className="buttonField">
                            <label htmlFor="sort" style={styles.label}>Sort By:</label>
                            <div className="input-field inputSelect">
                                <select style={styles.block} onChange={this.sortBy.bind(this)}>
                                    <option className="btn waves-effect waves-light" value="alpha">Alpha</option>
                                    <option className="btn waves-effect waves-light" value="id">Id</option>
                                    <option className="btn waves-effect waves-light" value="create">Created At</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="cardList">
                    {this.filter()}
                </div>
            </StyleRoot>
        );
    }
}
