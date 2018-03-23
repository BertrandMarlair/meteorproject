const Logout = () => {
    Meteor.logout();
    window.location.replace("/");
}

export default Logout;