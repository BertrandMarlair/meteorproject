import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Form = new Mongo.Collection('form');
 
if (Meteor.isServer) {
    Meteor.publish('form', function tasksPublication() {
      return Form.find();
    });

    Meteor.methods({
        'form.insert'(title, value) {
            check(title, String);
            check(value, String);
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Form.insert({
                title,
                value
            });
        },
        'form.remove'(selectId) {
            check(selectId, String);
            Form.remove(selectId);
        },
        'form.setChecked'(taskId, setChecked) {
            check(taskId, String);
            check(setChecked, Boolean);
            Form.update(taskId, { $set: { checked: setChecked } });
        },
    });
}