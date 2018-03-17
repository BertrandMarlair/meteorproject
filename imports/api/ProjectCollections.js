import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Project = new Mongo.Collection('project');
 
if (Meteor.isServer){
    Meteor.publish('project', ()=>{
        return Project.find();
    });

    Meteor.publish('project.one', (id)=>{
        return Project.find({_id: id})
    })

    Meteor.publish('project.comment', (id)=>{
        return Project.find({}, {"comment": 1, "name": 1})
    })

    Meteor.publish('test', (test)=>{
        if(test){
            return Project.find({ collegue: { $in: [this.userId] } })
        }
    });

    Meteor.publish('project.userComment', ()=>{
            return Meteor.users.find({'_id': 'PsnSgvyWYzsfzgo7uid'})
    });

    Meteor.methods({
        'project.insert'(name, desc, owner, collegue) {
            if (!Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(name, String);
            check(desc, String);
            check(owner, String);
            Project.insert({
                name,
                desc,
                owner,
                collegue,
                lanes: {}
            });
        },
        'project.remove'(selectId) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(selectId, String);
            Project.remove(selectId);
        },
        'project.setChecked'(taskId, setChecked) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(taskId, String);
            check(setChecked, Boolean);
            Project.update(taskId, { $set: { checked: setChecked } });
        },
        'project.removeCollegue'(idProject) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(idProject, String);
            Project.update(
                { _id: idProject },
                { $pull: { 'collegue': this.userId } }
            );
        },
        'project.updateCollegue'(idProject, collegue) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(idProject, String);
            check(collegue, Array);
            Project.update(
                { _id: idProject },
                { $set: { 'collegue': collegue }}
            );
        },
        'project.updateInformation'(idProject, title, description) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(idProject, String);
            check(title, String);
            check(description, String);
            Project.update(
                { _id: idProject },
                { $set: { 'desc': description, 'name': title }}
            );
        },
        'project.commentInsert'(id, idProject, comment) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(idProject, String);
            check(comment, String);
            Project.update(
                { _id: idProject },
                { $push: { 'comments' : {'_id' : id , 'from': this.userId, 'comment': comment } } }
            );
        },
        'project.addLike'(idProject, idComment) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                {'comments._id': idComment}, 
                {$push: {
                    'comments.$.like': 
                        {
                            'from': this.userId,
                        } 
                    }
                }    
            );
        },
        'project.removeLike'(idProject, idComment) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                {'comments._id': idComment}, 
                {$pull: {
                    'comments.$.like': 
                        {
                            'from': this.userId,
                        } 
                    }
                }    
            );
        },
        'project.commentByComment'(id, idProject, commentId, comment) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                {'comments._id': commentId}, 
                {$push: {
                    'comments.$.sousComment': 
                        { 'comments' : 
                            {
                                '_id' : id , 
                                'from': this.userId, 
                                'comment': comment 
                            } 
                        }
                    }
                }
            );
        },
        'project.lanes'(lanes, idProject) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            check(idProject, String);
            Project.update(
                { _id: idProject },
                {$set :{'lanes': lanes}}
            );
        },
        'project.addCate'(projectId,cateId, CurrentPage, label, style, title, cards) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                { '_id': projectId },
                {$push :{
                    'lanes.lanes': {
                        'id': cateId, 
                        'currentPage': CurrentPage,
                        'label': label,
                        'style': style,
                        'title': title,
                        'cards': cards,
                    }}
                }
            );
        },
        'project.removeCate'(idCate, idProject) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                { '_id': idProject },
                { $pull: { 'lanes.lanes': { id: idCate } } }
              );
        },
        'project.imageProfile'(idProject, image) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                { '_id': idProject },
                { $set: { 'profile': image } }
              );
        },
        'project.imageBackground'(idProject, image) {
            if (! Meteor.userId()) {
                throw new Meteor.Error('not-authorized');
            }
            Project.update(
                { '_id': idProject },
                { $set: { 'background': image } }
              );
        },
    });
}
