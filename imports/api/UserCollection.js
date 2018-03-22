import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('allUsers', function(role) {
    if(role === 'admin'){
      return Meteor.users.find({}, {fields:{emails:1, profile:1}})
    }else{
      return Meteor.users.find({_id : this.userId}, {fields:{emails:1, profile:1}})
    }
  })

  Meteor.publish('allUsersAbsences', function(role) {
    if(role === 'admin'){
      return Meteor.users.find({})
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
  Meteor.methods({
    'user.absences'(date, cause) {
      if (!Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
      }
      check(date, String);
      check(cause, String);
      Project.update(
        { _id: this.userI },
        { $push: { 'absences': date }}
      );
    }
  });
}
