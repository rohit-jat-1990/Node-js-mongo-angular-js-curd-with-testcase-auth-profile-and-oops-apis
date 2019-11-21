require('dotenv')
const CONSTANTS = require('../Config/app.constants');
const nodemailer = require('nodemailer')
/**
 * @class Email
 * @method send
 * @description class for send an email using SMTP
 */
class Email {
  send (options) {
    return new Promise((resolve, reject) => { // TO CHECK WEATHER EMAIL SENT OR NOT, I USE PROMISE
      let mailConfig
      mailConfig = CONSTANTS.EMAIL_CONFIG
      if (process.env.NODE_ENV === CONSTANTS.PRODUCTION) {
        mailConfig = CONSTANTS.EMAIL_CONFIG
      }
      let transporter = nodemailer.createTransport(mailConfig)
      let mailOptions = {
        from: {
          name: CONSTANTS.EMAIL_FORM_NAME,
          email:CONSTANTS.EMAIL_FROM_EMAIL
        },
        to: options.user.email,
        subject: options.subject,
        html: options.content
      }
      transporter.sendMail(mailOptions, (error) => {
        // if (process.env.NODE_ENV !== CONSTANTS.DEV) {
        //   reject({error :false,message:CONSTANTS.MESSAGES.PLEASE_SET_EMAIL_CONFIG});
        // }
        if (error) {
          reject({is_email_sent:false,message:CONSTANTS.MESSAGES.MAKE_SURE_EMAIL_CONFIG});
        } else {
          resolve({is_email_sent:true,message:CONSTANTS.EMAIL_SUBJECTS.RESET_LINK_MSG});
        }     
      })
    });
  }
}

module.exports = new Email()
