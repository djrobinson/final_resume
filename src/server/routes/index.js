require('dotenv').config();
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

var pw = process.env.GMAIL_PW;

var helper = require('sendgrid').mail;

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

router.post('/email', function(req, res, next){
  from_email = new helper.Email(req.body.email);
  to_email = new helper.Email("daniel@djrobinson.me");
  subject = req.body.subject;
  content = new helper.Content("text/plain", req.body.message);
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
    res.redirect('/');
  })
});

router.get('/resume', function(req, res, next){
  res.redirect('/resume/Danny_Robinson_Resume.pdf');
});


module.exports = router;
