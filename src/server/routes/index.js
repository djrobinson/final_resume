require('dotenv').config();
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

var pw = process.env.GMAIL_PW;

var transporter = nodemailer.createTransport('smtps://dannyrobinsontestmail%40gmail.com:'+pw+'@smtp.gmail.com');
var helper = require('sendgrid').mail;
console.log("SENDGRID!", process.env.SENDGRID_API_KEY);


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.post('/sendgrid', function(req, res, next){

  from_email = new helper.Email("test@example.com")
  to_email = new helper.Email("daniel@djrobinson.me")
  subject = "Hello World from the SendGrid Node.js Library"
  content = new helper.Content("text/plain", "some text here")
  mail = new helper.Mail(from_email, subject, to_email, content)

  var requestBody = mail.toJSON()
  var request = sg.emptyRequest()
  request.method = 'POST'
  request.path = '/v3/mail/send'
  request.body = requestBody
  sg.API(request, function (response) {
    console.log(response.statusCode)
    console.log(response.body)
    console.log(response.headers)
    res.json("worked?")
  })
})

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

router.get('/resume', function(req, res, next){
  res.redirect('/resume/Danny_Robinson_Resume.pdf');
});


module.exports = router;
