#!/usr/bin/env node

/**
 * Doesn't account for cross-product discounts eg. 5 of any type of chocolate for $5. 
 * Doesn't account for price by weight. Only price by cardinality.
 */

var offer = require('./Offer.js');
var product = require('./Product.js');

function main() {
	var chips = new product.Product('Chips', 100, 5.00);
	var value = 0.0,
		money = 0.0;

	chips.setOffer(offer.noOffer);
	chips.stockValue();

	money += chips.checkout(10);
	
	value += chips.soldValue();
	chips.setOffer(offer.buy3For10);
	chips.stockValue();

	money += chips.checkout(20);
	money += chips.checkout(40);
	value += chips.soldValue();

	console.log('VALUE: $' + value);
	console.log('MONEY: $' + money);
};

main();