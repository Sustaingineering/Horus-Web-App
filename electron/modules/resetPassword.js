const {ipcMain} = require('electron');
//Node Emailer variables
const nodemailer = require('nodemailer');
const datastore = require('../datastore');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'horus.sustaingineering@gmail.com',
    pass: 'horus4ever!'
  }
});

//Verification Code

const emailTemplate = {
  from: 'horus.sustaingineering@gmail.com',
  subject: 'Reset your Password Verification Code',
};

//Verify email
var generatePasswordToken = exports.generatePasswordToken =  async (e, msg) => {
  try {
    console.log('inside pass')
    // Check email existance
    let emailExists = await datastore.findUser(msg.email);
    console.log('inside pass22', emailExists)

    if (!emailExists) {
      e.sender.send('email-exists', {error:"Email does not exist"});
      return;
    }
    console.log('inside pass2')

    let userEmail = msg.email;
    //Generate random code to recover password
    let randomCode = Math.random().toString(36).substring(7);
    //Populate email template
    emailTemplate.to = userEmail;
    emailTemplate.html =
    `
    <p>
    Hi,
      This is your temporary verification code: ` + randomCode + `
    </p>
    `
    console.log('inside pass4')

    //Create Password token on Database
    await datastore.storePasswordToken(randomCode, userEmail)
    console.log('inside pass5')

    //Send email to user
    await transporter.sendMail(mailOptions, function (error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
    e.sender.send('email-exists', "Email exists!");
  } catch(error) {
    console.log(error)
    e.sender.send('email-exists', {error: error}); 
  }
}

//ipcMain.on('generate-password-token', generatePasswordToken)

  //VerifyCode
// ipcMain.on('verify-and-update-password', async (e, msg) => {
//   try {
//     let isTokenValid = await datastore.checkPasswordToken(msg.token, msg.email);
//     if(!isTokenValid) {
//       e.sender.send('verify-code', {error: 'Wrong Verification Code entered'});
//       return;
//     }
//     //Reset passoword
//     await datastore.newPassword({email: msg.email, password: msg.password});
//     await datastore.clearPasswordTokens(msg.email);
//     e.sender.send('reset-password', "Password changed!");
//   } catch(error) {
//     e.sender.send('verify-code', {error: error});
//   }
// }) 