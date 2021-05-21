const mailgun = require("mailgun-js");
const DOMAIN = 'portal.bellripper.com';
const mg = mailgun({apiKey: "91dc585d7ea62bbce58e9a3e002a8f81-6ae2ecad-f03fc7ac", domain: DOMAIN});
const data = {
	from: 'Excited User <admin@bellripper.com>',
	to: 'audrey@satxconsultants.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});