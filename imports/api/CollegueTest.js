import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Project } from './ProjectCollections';
 
export const Collegue = Project.find({}).fetch();
 
if (Meteor.isServer){
    Meteor.publish('mabite', function(test) {
        return Collegue.find({});
    });
}