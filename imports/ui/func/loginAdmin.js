import menuListConnectedAdmin from './MenuListConnectedAdmin';

const LoggedAdmin = (info) => {
    if(Meteor.user()){
        if(Meteor.user().profile.role == 'admin'){
            switch(info) {
                case 'MENU_CONNECTED_ADMIN' : { 
                    return menuListConnectedAdmin
                }
                
            }
        }
    }
}
export default LoggedAdmin;