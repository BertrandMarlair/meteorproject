import React, { Component } from 'react';
import { fadeInUp, fadeIn } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import { Link } from 'react-router-dom';

const styles = {
    fadeInUp: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
    },
    fadeIn: {
        animation: 'x 0.4s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    }
  }

export default class BadgeCate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: ""
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        if(document.querySelectorAll("input").length > 0 && document.querySelectorAll("label").length > 0){
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
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.searchBar.bind(this));
    }
    
    slugify(text){
        return text.toString().toLowerCase()
            .replace(/\s+/g, '')
            .replace(/-+/g, '')
            .replace(/\(+/g, '')
    }

    handleChange(event){
        var test = this.slugify(event.target.value);
        var re = /\W/;
        var re2 = /\s/;
        if(!re.test(test)){
          this.setState({searchString: test});
        }
        if(re2.test(test)){
          this.setState({searchString: test});
        }
    }

    searchBar(){
        if(document.querySelectorAll(".searchBar").length > 0){
            if (window.scrollY > 258) {
                document.querySelector(".searchBar").classList.add("fixe");
                if(document.querySelector(".navrelatif")){
                    document.querySelector(".searchBar").classList.add("allTop");
                    document.querySelector(".searchBar").classList.remove("relativeTop");
                }else{
                    document.querySelector(".searchBar").classList.remove("allTop");
                    document.querySelector(".searchBar").classList.add("relativeTop");
                }
            } else {
                if(document.querySelector(".searchBar")){
                    document.querySelector(".searchBar").classList.remove("fixe");
                }
            }   
        }
    }

    filter(){
        var libraries = this.props.category;
        var searchString = this.state.searchString.trim().toLowerCase();
        if(searchString.length > 0){
            libraries = libraries.filter(function(l){
                return l[0].toLowerCase().match( searchString );
            });
        }
        return(
            this.mapping(libraries)
        ) 
    }

    mapping(category){
        if(category.length !== 0){
            return(
            category.map((SingleCategory, index) =>{
              return (
                    <StyleRoot style={styles.fadeIn} key={index} className="category">
                        <Link to={"badgecategory/"+SingleCategory[1]} className="linkCate">
                            <div className="imgCate">
                                <img src={"https://inside.becode.org/assets/img/badges_categories/"+ SingleCategory[1] +".jpg"} style={styles.img} alt="category"/>
                            </div>
                            <div className="titleCate">
                                {SingleCategory[0]}
                            </div>
                        </Link>
                    </StyleRoot>
                );
            }));
        }else{
            return(
                <p>
                     No Results
                </p>
            )
        }
    }

    render() {
        return (
            <div className="MainCate">
                <div className="imageMainCate">
                    <section className="head">
                        <div className="innerHead" data-bf="SELECT" data-af="YOU WANT">CATEGORY</div>
                    </section> 
                </div>
                <div className="searchBar">
                    <div className="input-field">
                        <input 
                            id="search"
                            className="validate"
                            type="text" 
                            value={this.state.searchString} 
                            onChange={this.handleChange.bind(this)}  
                        />
                        <label htmlFor="search">Search the category</label>
                    </div>
                </div>
                <div className="ListCate" >
                    {this.filter()}
                </div>
            </div>
        );
    }
}