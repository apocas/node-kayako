var utils = require('node-kayako/lib/utils');

var ticketattachments = function (client, xml) {
	this.client = client;
	if (xml) {
		utils.parse_xml(this, xml);
	}
};

ticketattachments.prototype.get = function (ticketid, callback) {
	this.client.get_items('/Tickets/TicketAttachment/ListAll/' + ticketid, require('./ticketattachment'), callback);
};

module.exports = ticketattachments;
