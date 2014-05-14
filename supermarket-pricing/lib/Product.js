#!/usr/bin/env node

var Product = function(name, price) {
	this.name = name;
	this.price = price;
	this.inventory = [];
	this._id = 1;
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
			_id: this._id++,
			type: this.name,
			sold: false
		});
	}
	return this;
};

Product.prototype.printInventory = function() {
	console.log('INVENTORY');
	console.log(this.inventory);
	return this;
};

Product.prototype.setOffer = function(offer) {
	this.offer = offer;
	console.log('Offer ' + offer.getName() + ' on ' + this.name);
	return this;
};

Product.prototype.checkout = function(count) {
	console.log('PURCHASE');
	this.offer.do(this, count);
	return this;
}

module.exports.Product = Product;