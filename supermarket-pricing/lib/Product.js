#!/usr/bin/env node

var uuid = require('uuid'),
	Table = require('cli-table'),
	winston = require('winston');
require('colors');

var formatPrice = function(price) {
	if (typeof(price) !== 'undefined') {
		return '$' + price;
	}
	return '-';
};

var Product = function(name, price) {
	this.name = name;
	this.price = price;
	this.inventory = [];
	this.lastSoldId = -1;
	return this;
};

Product.prototype.addItem = function(item) {
	this.inventory.push(item);
	return this;
};

Product.prototype.getItem = function() {
	var key = this.lastSoldId++ + 1;
	if (key >= this.inventory.length) {
		throw new Error('Run out of stock!');
	}
	return this.inventory[key];
};

Product.prototype.populateInventory = function(itemCount) {
	for (var i = 0; i < itemCount; i++) {
		this.addItem({
			_id: uuid.v4(),
			type: this.name
		});
	}
	return this;
};

Product.prototype.printInventory = function() {
	winston.info('INVENTORY');
	var table = new Table({
		head: [ 'Product code', 'Customer', 'Product', 'Offer', 'Offer price', 'Selling price', 'Original price', '' ]
	});
	var item;
	for (var i = 0; i < this.inventory.length; i++) {
		item = this.inventory[i];
		table.push([
			item._id,
			item.customer,
			item.type,
			item.offer,
			formatPrice(item.offerPrice),
			formatPrice(item.sellingPrice),
			formatPrice(item.originalPrice),
			item.offerPrice && item.sellingPrice && (item.sellingPrice >= item.offerPrice) ? '✓'.green : ''
		]);
	}
	console.info(table.toString());
	return this;
};

Product.prototype.setOffer = function(offer) {
	this.offer = offer;
	winston.info('Offer ' + offer.getName() + ' on ' + this.name);
	return this;
};

Product.prototype.purchase = function(customer, count) {
	winston.info('PURCHASE');
	this.offer.applyOffer(this, count, customer);
	return this;
};

module.exports = Product;