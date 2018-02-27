import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SideNavComp extends Component {
    componentDidMount(){
        let overlay = document.createElement('div');
        overlay.id = "overlay";
        overlay.className = "overlayClose";
        document.getElementsByTagName('body')[0].appendChild(overlay);
        overlay.addEventListener('click', () => {
            this.toggleMenu();
        })
    }

    componentDidUpdate(){
        let sideBar = document.getElementById('SideBar');
        let overlay = document.getElementById('overlay');
        let body = document.getElementsByTagName('body')[0];
        if(sideBar && overlay){
            if(this.props.SideBarState == false){
                sideBar.classList.remove('open');
                overlay.classList.remove('overlay');
                overlay.classList.add('overlayClose');
                body.style.overflow = "scroll";
            }else if(this.props.SideBarState == true){
                sideBar.classList.add('open');
                overlay.classList.add('overlay');
                overlay.classList.remove('overlayClose');
                body.style.overflow = "hidden";
            }
        }
    }

    toggleMenu(){
        this.props.SideBarToggle(false);
    }

    render() { 
        if(Meteor.userId() && Meteor.user()){
            if(Meteor.user().profile.role == 'admin'){
                connected = (
                    <div>
                        <hr />
                        <ul>
                            {this.props.menuListConnected.map((link, index) => {
                                return(
                                    <li className="waves-effect waves-teal" key={index} style={styles.li} onClick={()=>this.toggleMenu()}>
                                        <NavLink style={styles.a} activeClassName="active" to={link.path}>
                                            {link.name}
                                        </NavLink>
                                    </li> 
                                )
                            })}
                            <hr />
                            {this.props.menuListConnectedAdmin.map((link, index) => {
                                return(
                                    <li className="waves-effect waves-teal" key={index} style={styles.li} onClick={()=>this.toggleMenu()}>
                                        <NavLink style={styles.a} activeClassName="active" to={link.path}>
                                            {link.name}
                                        </NavLink>
                                    </li> 
                                )
                            })}
                        </ul>
                    </div>
                )
            }else{
                connected = (
                    <div>
                        <hr />
                        <ul>
                            {this.props.menuListConnected.map((link, index) => {
                                return(
                                    <li className="waves-effect waves-teal" key={index} style={styles.li} onClick={()=>this.toggleMenu()}>
                                        <NavLink style={styles.a} activeClassName="active" to={link.path}>
                                            {link.name}
                                        </NavLink>
                                    </li> 
                                )
                            })}
                        </ul>
                    </div>
                )
            }
        }else {
            connected = "";
        }
        return ( 
            <div id="SideBar" className="SideBar" style={styles.SideBar}>
                <ul style={styles.ul}>
                    <li style={styles.liUser}>
                        <div style={styles.background}>
                            <div style={styles.userInfo}>
                                <NavLink activeClassName="active" to="/UserAccounts">
                                    <div style={styles.user} onClick={()=>this.toggleMenu()}>
                                        <img style={{height: "100%"}} src={this.props.UserImage ? this.props.UserImage : "http://uwm.edu/french-italian-comparative-literature/wp-content/uploads/sites/206/2015/06/grey-man.png"} alt="Profil User"/>
                                    </div>
                                </NavLink>
                                <NavLink activeClassName="active" to="/UserAccounts">
                                    <div style={styles.userName} onClick={()=>this.toggleMenu()}>
                                        {this.props.name ? this.props.name : "inconnu"} {this.props.lastName ? this.props.lastName : "inconnu"}
                                    </div>
                                </NavLink>
                                <NavLink activeClassName="active" to="/UserAccounts">
                                    <div style={styles.userEmail} onClick={()=>this.toggleMenu()}>
                                        {this.props.mail ? this.props.mail : "inconnu"}
                                    </div>
                                </NavLink>
                                <img style={{marginLeft: "-20px"}} src={this.props.BackgroundImage ? this.props.BackgroundImage : "https://png.pngtree.com/thumb_back/fh260/back_pic/00/01/80/73560a545c6ae6b.jpg"} alt="background User"/>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul>
                    {this.props.menuList.map((link, index) => {
                        return(
                            <li className="waves-effect waves-teal" key={index} style={styles.li} onClick={()=>this.toggleMenu()}>
                                <NavLink style={styles.a} activeClassName="active" to={link.path}>
                                    {link.name}
                                </NavLink>
                            </li> 
                        )
                    })}
                </ul>
                {connected}
            </div>
         )
    }
}
 
export default SideNavComp;

const styles = {
    SideBar:{
        top: "0",
        width: "300px",
        height: "100%",
        position: "fixed",
        background: '#fff',
        overflow: "scroll",
        zIndex: '999',
        boxShadow: "rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px",
        transform: "translateX(-100%)",
        transition: "0.3s",
    },
    ul:{
        margin: "0",
    },
    li:{
        width: "100%",
        height: "50px",
        lineHeight: "50px",
        paddingLeft: "20px",
    },
    a:{
        display: "block",
        color: "rgb(39, 39, 39)",
        fontWeight: "500",
        width: "100%",
        height: "100%",
        fontSize: "13px",
        height: "44px",
        padding: "0 20px",
    },
    liUser:{
        height: "176px",
        background: "#f1f1f1",
    },
    background:{
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    user:{
        position: "absolute",
        width: "60px",
        height: "60px",
        background: "red",
        top: "36px",
        borderRadius: "100%",
        overflow: "hidden",
    },
    userName:{
        position: "absolute",
        top: "110px",
        color: "white",
        fontWeight: "500",
        fontSize: "16px",
    },
    userEmail:{
        position: "absolute",
        top: "137px",
        color: "white",
        fontWeight: "400",
        fontSize: "14px",
    },
    userInfo:{
        marginLeft: "20px",
    }
}