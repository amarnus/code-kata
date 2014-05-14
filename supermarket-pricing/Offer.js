#!/usr/bin/env node

function myRound(value) {
	return parseFloat(parseFloat(Math.round(value * 100) / 100).toFixed(2));
};

var Offer = function(name, method) {
	this.name = name;
	this.method = method;
};

Offer.prototype.getName = function() {
	return this.name;
};

Offer.prototype.do = function() {
	return this.method.apply(this, arguments);
};

module.exports.noOffer = new Offer('no offer', function(product, count) {
	var price = 0.0;
	for (var i = 0; i < count; i++) {
		price += product.price;
	}
	price = myRound(price);
	console.log(count + ' ' + product.name + ' at $' + price);
	return price;
});

module.exports.buy2get1Free = new Offer('buy 2 get 1 free', function(product, count) {
	var i = count,
		j = 0,
		price = 0.0;
	while (i > 0) {
		if (++j > 2) {
			j = 0;
			continue;
		}
		price += product.price;
		i--;
	}
	price = myRound(price);
	console.log(count + ' ' + product.name + ' at $' + price + ' (' + this.getName() + ')');
	return price;
});

module.exports.buy3For10 = new Offer('buy 3 for $10', function(product, count) {
	var i = count,
		j = 0,
		price = 0.0,
		lastPrice = 0.0;
	while (i > 0) {
		if (++j === 3) {
			price = lastPrice + 10.00;
			lastPrice = price;
			j = 0;
		}
		else {
			price += product.price;
		}
		i--;
	}
	price = myRound(price);
	console.log(count + ' ' + product.name + ' at $' + price + ' (' + this.getName() + ')');
	return price;
});

module.exports.Offer = Offer;