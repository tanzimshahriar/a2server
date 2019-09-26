const nodemailer = require("nodemailer");
const config = require("../config/mailer");

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.USER,
        pass: config.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {
    sendEmail(mail) {
        return new Promise((resolve, reject) => {
            transport.sendMail(mail, (err, info) => {
                if (err) reject(err);
                resolve(info);
            })
        })
    }
}