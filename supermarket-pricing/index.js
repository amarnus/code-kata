#!/usr/bin/env node

/**
 * Doesn't account for cross-product discounts eg. 5 of any type of chocolate for $5. 
 * Doesn't account for price by weight. Only price by cardinality.
 */

var winston = require('winston');
var opt = require('node-getopt').create([
		[''  , 'verbose', 'Verbose mode'],
		['h' , 'help',  'Help']
	])
	.bindHelp()
	.parseSystem();

var Offer = require('./lib/Offer.js');
var Product = require('./lib/Product.js');
var Customer = require('./lib/Customer.js');

if (!opt.options.verbose) {
	winston.remove(winston.transports.Console);
}

var main = function() {
	var kurkure = new Product('Kurkure', 6.00).populateInventory(100).setOffer(Offer.noOffer);

	// Customer buys when there is no offer.
	new Customer().checkout(kurkure, 32);
	
	// Shopkeeper introduces offer
	kurkure.setOffer(Offer.buy3For10);
	new Customer().checkout(kurkure, 40);

	// Shopkeeper changes offer
	kurkure.setOffer(Offer.buy2Get1Free);
	new Customer().checkout(kurkure, 28);
	
	// Shopkeeper prints inventory
	kurkure.printInventory();
};

main();