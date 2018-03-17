import React from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import SideNavComp from './SideNav/SideNavComp';

import Logout from '../../func/Logout';
import menuList from '../../func/MenuList';
import menuListConnected from '../../func/MenuListConnected';
import menuListConnectedAdmin from '../../func/MenuListConnectedAdmin';
import Logged from '../../func/login';
import LoggedAdmin from '../../func/loginAdmin';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      SideBar: "",
      position: false,
      user: {},
      redirect: false,
      isLoggedIn: Meteor.userId(),
    }
  }

  componentDidMount(){
    let scrollUp = 0;
    let scroll = 0;
    let afficher = false;
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100){
        scroll = window.scrollY;
        if(scrollUp < scroll){
          scrollUp = scroll;
        }
        if(scroll+100 < scrollUp){
          scrollUp = scroll+100;
          afficher = false;
        }else if(scroll == scrollUp){
          afficher = true;
        }
        this.menuSee(afficher);
      }
    });
    window.addEventListener('keydown', (e) => {
      if(e.key == "Escape"){
        this.SidebarToggle(false);
      }
    });
  }

  SidebarToggle(action){
    this.setState({
      SideBar: action
    })
  }

  menuSee(position){
    if(this.state.position != position){
      document.getElementsByTagName('nav')[0].classList.toggle('navrelatif');
      document.getElementsByTagName('nav')[0].classList.toggle('navfixe');
    }
    if(position){
      this.setState({
        position: true
      })
    }else{
      this.setState({
        position: false
      })
    }
  }
  
  Logout(){
    Meteor.logout((err) => {
      if(err){
        Materialize.toast(err.reason, 4000);
      }else{
        this.setState({isLoggedIn: !this.state.isLoggedIn});
        Materialize.toast("Logout Succefull !", 4000);
      }
    });
    setTimeout(() => { this.forceUpdate(); }, 200);
  }

  render() {
    if(!Meteor.userId()){
      NavOption = (
        <ul id="dropdown1" className="right dropdown-content">
          <li><NavLink activeClassName="active" to="/register">Register</NavLink></li>
          <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
        </ul>
      )
    }else{
      NavOption = (
        <ul id="dropdown1" className="right dropdown-content">
          <li><NavLink activeClassName="active" to="/UserAccounts">User account</NavLink></li>
          <li><a onClick={this.Logout.bind(this)}> Logout </a></li>
        </ul>
      )
    }
    return (
      <header className='Header'>
        <div style={{height: "64px"}}></div>
        <SideNavComp 
          menuList={menuList} 
          menuListConnected={Logged('MENU_CONNECTED')} 
          menuListConnectedAdmin={LoggedAdmin('MENU_CONNECTED_ADMIN')} 
          BackgroundImage={Logged('BACKGROUND_IMAGE')} 
          UserImage={Logged('USER_IMAGE')}
          SideBarToggle={this.SidebarToggle.bind(this)}
          SideBarState={this.state.SideBar}
          name={Logged('NAME')}
          lastName={Logged('LASTNAME')}
          mail={Logged('EMAIL')}
        />
        <nav className="navfixe">
          <div className="nav-wrapper">
            <div className="button-collapse" style={{cursor: "pointer"}} data-activates="nav-mobile" onClick={() => this.SidebarToggle(true)}>
              <i className="material-icons">view_headline</i>
            </div>
            <div className="brand-logo center"><NavLink activeClassName="active" to="/">Logo</NavLink></div>
            <ul>
              {NavOption}
              <li style={{float: "right"}} onClick={() => { this.forceUpdate()}}>
                <a className="dropdown-button" href="#!" data-activates="dropdown1">
                  User Account
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}