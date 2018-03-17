import { Mongo } from 'meteor/mongo';
if (Meteor.isServer) {
  Meteor.publish('allUsers', function(role) {
    if(role === 'admin'){
      return Meteor.users.find({}, {fields:{emails:1, profile:1}})
    }else{
      return Meteor.users.find({_id : this.userId}, {fields:{emails:1, profile:1}})
    }
  })

  Meteor.publish('connectedUser', function() {
      return Meteor.users.find({_id : this.userId}, {fields:{emails:1, profile:1}})
  });

  Meteor.publish('users', function() {
    return Meteor.users.find({}, {fields: { profile: 1}})
  });
}
