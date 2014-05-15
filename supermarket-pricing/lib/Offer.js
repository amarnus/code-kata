#!/usr/bin/env node

var winston = require('winston');

var round = function(value) {
	return parseFloat(parseFloat(Math.round(value * 100) / 100).toFixed(2));
};

var Offer = function(name, method) {
	this.name = name;
	this.method = method;
};

Offer.prototype.getName = function() {
	return this.name;
};

Offer.prototype.applyOffer = function() {
	return this.method.apply(this, arguments);
};

Offer.noOffer = new Offer('no offer', function(product, count, customer) {
	var price = 0.0, item;
	for (var i = 0; i < count; i++) {
		price += product.price;
		item = product.getItem();
		item.offer = this.name;
		item.sellingPrice = round(product.price);
		item.originalPrice = product.price;
		item.customer = customer.name;
	}
	price = round(price);
	winston.info(count + ' ' + product.name + ' at $' + price);
	return price;
});

Offer.buy2Get1Free = new Offer('buy 2 get 1 free', function(product, count, customer) {
	var i = count,
		j = 0,
		price = 0.0,
		item;
	while (i > 0) {
		item = product.getItem();
		if (++j > 2) {
			j = 0;
			item.sellingPrice = 0;
		}
		else {
			price += product.price;
			item.sellingPrice = product.price;
		}
		item.offer = this.name;
		item.offerPrice = round(2/3 * product.price);
		item.originalPrice = product.price;
		item.customer = customer.name;
		i--;
	}
	price = round(price);
	winston.info(count + ' ' + product.name + ' at $' + price + ' (' + this.getName() + ')');
	return price;
});

Offer.buy3For10 = new Offer('buy 3 for $10', function(product, count, customer) {
	var i = count,
		j = 0,
		price = 0.0,
		item;
	while (i > 0) {
		item = product.getItem();
		if (++j === 3) {
			price += (item.sellingPrice = (10 - 2 * product.price));
			j = 0;
		}
		else {
			price += (item.sellingPrice = product.price);
		}
		item.offer = this.name;
		item.offerPrice = round(10/3);
		item.originalPrice = product.price;
		item.customer = customer.name;
		i--;
	}
	price = round(price);
	winston.info(count + ' ' + product.name + ' at $' + price + ' (' + this.getName() + ')');
	return price;
});

module.exports = Offer;