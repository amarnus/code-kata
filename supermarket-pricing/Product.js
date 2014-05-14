#!/usr/bin/env node

var Product = function(name, total, price) {
	this.name = name;
	this.total = total;
	this.price = price;
	this.soldByOffer = {};
};

Product.prototype.setOffer = function(offer) {
	this.offer = offer;
	console.log('Offer ' + offer.getName() + ' on ' + this.name);
	this.soldByOffer[offer.getName()] = 0;
};

Product.prototype.stockValue = function() {
	console.log('STOCK VALUE');
	return this.offer.do(this, this.total);
};

Product.prototype.soldValue = function() {
	console.log('SOLD VALUE');
	return this.offer.do(this, this.soldByOffer[this.offer.getName()]);
};

Product.prototype.checkout = function(count) {
	if (count > this.total) {
		throw new Error('Run out of stock!');
	}
	console.log('PURCHASE');
	var price = this.offer.do(this, count);
	this.total -= count;
	this.soldByOffer[this.offer.getName()] += count;
	return price;
}

module.exports.Product = Product;