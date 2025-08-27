var utils = require('node-kayako/lib/utils');
var querystring = require('querystring');
var crypto = require('crypto');

var ticketattachment = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml);
	}
};

ticketattachment.prototype.post = function (optionsp, callback) {
	var client = this.client;
	var salt = crypto.randomBytes(20).toString('base64');
	var options = {
		e: '/Tickets/TicketAttachment',
		apikey: this.client.get_apikey(),
		salt: salt,
		signature: this.client.generate_signature(salt)
	};

	options.ticketid = optionsp.ticketid;
	options.ticketpostid = optionsp.ticketpostid;
	options.filename = optionsp.filename;
	options.contents = optionsp.contents;

	var postdata = querystring.stringify(options);

	var opts = {
		path: '/api/index.php',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postdata.length
		}
	};

	this.client.request(opts, postdata, function (err, res) {
		if (err) {
			callback(err);
		} else {
			client.parse_items(res.data, client, ticketattachment, callback);
		}
	});
};

ticketattachment.prototype.get = function (ticketid, id, callback) {
	this.client.get_item('/Tickets/TicketAttachment/' + ticketid + '/' + id, ticketattachment, callback);
};

module.exports = ticketattachment;
