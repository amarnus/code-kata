#!/usr/bin/env node

var eden = require('node-eden');

function rand(max, min) {
	min = min || 0;
	return Math.floor(Math.random() * max) + min;
}

var Customer = function() {
	var genders = [ 'm', 'f' ];
	var i = rand(genders.length);
	this.name =
		((genders[i] === 0) ? eden.adam() : eden.eve()) + ' ' +
		eden.adam();
};

Customer.prototype.checkout = function(product, itemCount) {
	itemCount = itemCount || rand(product.inventory.length - 1);
	product.purchase(this, itemCount);
};

module.exports = Customer;