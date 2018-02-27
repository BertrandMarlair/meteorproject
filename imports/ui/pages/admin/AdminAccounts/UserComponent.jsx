import React from 'react';

export default class User extends React.Component {
  handleSubmit(e){
    e.preventDefault();
    let li = e.target.role.value;
    this.props.changeRole(this.props.id, li, this.props.index);
    e.target.reset();
  }

  handleRemove(e){
    this.props.remove(this.props.id);
  }

  render() {
    return (
      <li style={styles.li}>
        <div style={styles.userAdmin}>
          <div style={styles.image}>
            <img className="imgAdmin" src={this.props.profile.avatar ? this.props.profile.avatar : 'http://uwm.edu/french-italian-comparative-literature/wp-content/uploads/sites/206/2015/06/grey-man.png'} alt='avatar'/>
          </div>
          <div style={styles.text}>
            <ul style={styles.ulList}>
              <li style={styles.liList}>{this.props.user} <button onClick={this.handleRemove.bind(this)} style={styles.button} className="waves-effect waves-light btn red">✕</button></li>
              <li style={styles.liList}>{this.props.profile.username} {this.props.profile.lastname} {this.props.profile.profession}</li>
              <li style={{height: "42px"}} name="role" ref={this.props.id}>
                <form onSubmit={this.handleSubmit.bind(this)} style={styles.form}><input style={styles.input} type="text" name="role" placeholder={this.props.profile.role}/><button style={styles.submit} className="aves-effect waves-light btn btn-block">Submit</button></form>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

const styles = {
  li:{
    height: '90px',
    background: 'white',
    boxShadow: '0 10px 16px 0 rgba(0,0,0,.05), 0 6px 20px 0 rgba(0,0,0,.096)',
    listStyleType: "none",
    marginTop: "10px",
    marginBottom: "10px",
    borderTopLeftRadius: "95px",
    borderBottomLeftRadius: "95px",
    overflow: "hidden",
  },
  userAdmin:{
    height: "100%",
    display: "block",
  },
  image:{
    height: "100%",
    float: "left",
    marginRight: "20px",
    width: "75px",
  },
  imageSrc:{
    height: "100%",
  },
  text:{
    height: "100%",
    paddingLeft: "75px",
  },
  ulList:{
    margin: "0",
    height: "100%",
  },
  liList:{
    height: "27%"
  },
  form:{
    height: "90%",
    width: "100%",
  },
  input:{
    height: "100%",
    float: "left",
    width: "50%",
    marginRight: "10px",
  },
  submit:{
    float: "right",
    marginRight: "5px",
    width: "109px",
  },
  button:{
    float: "right",
    marginRight: "5px",
    marginTop: "5px",
    width: "109px",
  }
}