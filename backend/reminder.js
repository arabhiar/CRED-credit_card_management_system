const cron = require('node-cron');
const nodemailer = require('nodemailer');
const getAllRemindersProfiles = require("./getAllRemindersProfiles");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);




function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
}

const reminder = () => {
    let todayDate = new Date();
    
    const afterFiveDaysDate = addDays(todayDate, 5);
    
    
    const date1 = parseInt(todayDate.getDate());
    const date2 = parseInt(afterFiveDaysDate.getDate());

    if(date2 < date1) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PAS,
            }
        });
        
        cron.schedule(`0 1 0 ${date1} * *`, async function() { // at 12:01 AM
            const reminderData = await getAllRemindersProfiles();

            for(const data of reminderData) {
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: data.email,
                    subject: 'Pay your outstanding amount',
                    text: `Hi cred user, You have an outstanding amount ${data.outstandingAmount} remaining to pay against card - ${data.cardNumber}.\nPay before the end of this month to earn rewards.`
                }
                transporter.sendMail(mailOptions, function(error, info) {
                    if(error)
                        console.log(error);
                    else {
                        console.log("Email sent: " + info.response);
                    }
                })
                if(data.phoneNumber !== null && data.phoneNumber !== undefined) {
                    client.messages
                        .create({
                            body: `Hi cred user, You have an outstanding amount ${data.outstandingAmount} remaining to pay against card - ${data.cardNumber}.\nPay before the end of this month to earn rewards.`,
                            from: process.env.TWILIO_PHONE_NO,
                            to: `+91${data.phoneNumber}`
                        })
                        .then(message => console.log(message.sid))
                        .catch((err) => console.log(err));
                }
            }
        })
    }
}


module.exports = reminder;