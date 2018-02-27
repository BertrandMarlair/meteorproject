import '../imports/startup/server/main.js';

if (Meteor.isServer) {
    Meteor.startup(function () {
        process.env.ENV_VARIABLE = 'MONGO_URL=mongodb://Belegan:fArand0le@ds247698.mlab.com:47698/marlairbertrand'
    });
  }