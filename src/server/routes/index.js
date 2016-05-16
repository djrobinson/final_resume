var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var pw = process.env.GMAIL_PW;
var transporter = nodemailer.createTransport('smtps://dannyrobinsontestmail%40gmail.com:'+pw+'@smtp.gmail.com');



router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.post('/email', function(req, res, next){
  console.log(req.body);
  var mailOptions = {
      from: req.body.email,
      to: 'daniel@djrobinson.me',
      subject: req.body.subject,
      text: req.body.message,
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      res.redirect('/');
  });
});

module.exports = router;
