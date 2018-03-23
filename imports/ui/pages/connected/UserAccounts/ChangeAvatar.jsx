import React, { Component } from 'react';

class ChangeAvatar extends Component {
    avatarSubmit(e) {
        e.preventDefault();
        let image = e.target.AvatarInput.files[0];
        if(image.size < 10485760){
            let FR = new FileReader();
            FR.onload = (data) => {
                Meteor.users.update({_id: Meteor.userId() }, {$set: { 'profile.avatar': data.target.result}}, (err) => {
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast('Avatar correctly uploaded', 4000);
                    }
                })
            }
            FR.readAsDataURL(image);
        }else{
            Materialize.toast('image bigger than 10mb or not a image', 4000);
        }
    }

    backgroundSubmit(e) {
        e.preventDefault();
        let image = e.target.BackgroundInput.files[0];
        if(image.size < 10485760){
            let FR = new FileReader();
            FR.onload = (data) => {
                Meteor.users.update({_id: Meteor.userId() }, {$set: { 'profile.background': data.target.result}}, (err) => {
                    if(err){
                        Materialize.toast(err.reason, 4000);
                    }else{
                        Materialize.toast('Background correctly uploaded !', 4000);
                    }
                })
            }
            FR.readAsDataURL(image);
        }else{
            Materialize.toast('image bigger than 10mb or not a image', 4000);
        }
    }
       
    render() {
        return(
            <div id="main" className="row">
                <h5>Edit your Avatar :</h5>
                <form onSubmit={this.avatarSubmit.bind(this)}> 
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input type="file" name="AvatarInput" style={{height: "50px"}} />
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </div>
                </form>
                <hr/>
                <h5>Edit your Background :</h5>
                <form onSubmit={this.backgroundSubmit.bind(this)}> 
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">supervisor_account</i>
                            <input type="file" name="BackgroundInput" style={{height: "50px"}} />
                        </div>
                        <button className="col s12 waves-effect waves-light btn btn-block">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
 
export default ChangeAvatar;
