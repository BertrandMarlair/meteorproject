import menuListConnected from './MenuListConnected';

const Logged = (info) => {
    if(Meteor.user()){
        if(Meteor.user().emails){
            switch(info) {
                case 'CONNECT' : { 
                    return Meteor.user()
                }
                case 'ID' : { 
                    return Meteor.userId()
                }
                case 'NAME' : { 
                    return Meteor.user().profile.username
                }
                case 'LASTNAME' : { 
                    return Meteor.user().profile.lastname
                }
                case 'ROLE' : { 
                    return Meteor.user().profile.role
                }
                case 'EMAIL' : { 
                    return Meteor.user().emails[0].address
                }
                case 'PROFESSION' : { 
                    return Meteor.user().profile.profession
                }
                case 'MENU_CONNECTED' : { 
                    return menuListConnected
                }
                case 'BACKGROUND_IMAGE' : { 
                    return Meteor.user().profile.background
                }
                case 'USER_IMAGE' : { 
                    return Meteor.user().profile.avatar
                }
            }
        }
    }
}
export default Logged;