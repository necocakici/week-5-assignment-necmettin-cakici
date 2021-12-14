"use strict";
const nodemailer = require("nodemailer");

async function emailer(recieverMail, newPassword) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "neco4inter@gmail.com",
      pass: "mea3jq14n",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Götür-API 👻" <gotur-destek@gotur.com>', // sender address
    to: recieverMail, // list of receivers
    subject: "Şifreniz Sıfırlandı ✔", // Subject line
    text: `Yeni şifreniz: ${newPassword}`, // plain text body
    html: `<b>Yeni şifreniz: ${newPassword}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
}
module.exports = {
  emailer,
};
//main().catch(console.error);
