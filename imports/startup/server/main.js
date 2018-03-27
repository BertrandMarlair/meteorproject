console.log("Starting server...");

import '../../api/api.js';

if(Meteor.isServer){
    Meteor.startup(() => {
        process.env.ROOT_URL="https://marlairbertrand.tk";
        process.env.MAIL_URL='smtp://8015797f124c2037c83a17c5012662f4:94fc2ae4aaaba80554723a570fed0ddd@in-v3.mailjet.com:587';
        
        Accounts.emailTemplates.from='marlair.bertrand@gmail.com';
        Accounts.emailTemplates.siteName='gmail.com';

        Accounts.emailTemplates.verifyEmail.subject = (user) => {
            return 'Confirm your adress mail';
        }
        
        Accounts.emailTemplates.verifyEmail.subject = (user, url) => {
            return 'Click on the following link to verify your adress Mail : ' + url;
        }

        Accounts.config({
            sendVerificationEmail:true
        })
    })
}