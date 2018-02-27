import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Project = new Mongo.Collection('project');
 
if (Meteor.isServer){
    Meteor.publish('project', function(test) {
        return Project.find();
    });

    Meteor.publish('test', function(test) {
        if(test){
            return Project.find({ collegue: { $in: [this.userId] } })
        }
    });

    Meteor.methods({
        'project.insert'(name, desc, owner, collegue) {
            check(name, String);
            check(desc, String);
            check(owner, String);
            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.insert({
                name,
                desc,
                owner,
                collegue
            });
        },
        'project.remove'(selectId) {
            check(selectId, String);
            Project.remove(selectId);
        },
        'project.setChecked'(taskId, setChecked) {
            check(taskId, String);
            check(setChecked, Boolean);
            Project.update(taskId, { $set: { checked: setChecked } });
        },
    });
}