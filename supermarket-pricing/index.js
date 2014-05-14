#!/usr/bin/env node

/**
 * Doesn't account for cross-product discounts eg. 5 of any type of chocolate for $5. 
 * Doesn't account for price by weight. Only price by cardinality.
 */

var offer = require('./Offer.js');
var product = require('./Product.js');

function main() {
	new product.Product('Kurkure', 6.00)
		.populateInventory(10)
		.setOffer(offer.noOffer)
		.checkout(2)
		.setOffer(offer.buy3For10)
		.checkout(2)
		.setOffer(offer.buy2Get1Free)
		.checkout(6)
		.printInventory();
};

main();